import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOccurrence, updateOccurrence } from "../http";
import { Occurrence } from "./OccurencesTable";

type EditOccurrenceEvent = FormEvent<HTMLFormElement> & {
  target: {
    timestamp: { value: string };
    videoLink: { value: string };
  };
};

export const EditOccurrence = () => {
  const { sport, technique, id } = useParams();
  const [occurrence, setOccurrence] = useState<
    Occurrence & { edits: { editedAt: string }[] }
  >();
  const navigate = useNavigate();
  const [awaitingRespopnse, setAwaitingResponse] = useState<boolean>(false);
  const [userResponseText, setUserResponseText] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    getOccurrence(id!)
      .then((resp) => resp.json())
      .then((data) => setOccurrence(data))
      .catch(() => console.log("couldnt fetch occurrence"));
  }, []);

  const handleOnSubmit = (e: EditOccurrenceEvent) => {
    e.preventDefault();
    const body = {
      timestamp: e.target.timestamp.value,
      videoLink: e.target.videoLink.value,
    };
    updateOccurrence(id!, body)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            setUserResponseText("Edited ✓");
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
              setAwaitingResponse(false);
              navigate(`/${sport}/${technique}`);
            }, 1500);
            break;
          default:
            setUserResponseText(
              `Unexpected error. HTTP status code: ${resp.status}. Try again later`,
            );
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 3000);
            setAwaitingResponse(false);
        }
      })
      .catch(() => {
        setUserResponseText("Unable to reach server. Try again later");
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 3000);
      });
  };

  const cancel: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    navigate(`/${sport}/${technique}`);
  };

  return (
    <>
      <p>
        <Link to="/">Home</Link> {`> ${sport} > `}{" "}
        <Link to={`/${sport}/${technique}`}>{`${technique}`}</Link>
        {` > Edit occurrence`}
      </p>
      {occurrence && (
        <>
          <p>Editing occurrence {occurrence.id}</p>
          <form onSubmit={handleOnSubmit}>
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              defaultValue={occurrence.date}
              disabled
            />

            <label htmlFor="athlete">Athlete *</label>
            <input
              type="text"
              id="athlete"
              defaultValue={occurrence.athlete}
              disabled
            />

            <label htmlFor="game">Game *</label>
            <input
              type="text"
              id="game"
              defaultValue={occurrence.game}
              disabled
            />

            <label htmlFor="timestamp">Timestamp *</label>
            <input
              type="text"
              id="timestamp"
              defaultValue={occurrence.timestamp}
              required
              disabled={awaitingRespopnse}
            />

            <label htmlFor="videoLink">Video link</label>
            <input
              type="url"
              id="videoLink"
              defaultValue={occurrence.video_link}
              disabled={awaitingRespopnse}
            />

            <input
              type="submit"
              value="Edit"
              className="edit"
              disabled={awaitingRespopnse}
            />
            <input
              type="button"
              value="Cancel"
              onClick={cancel}
              disabled={awaitingRespopnse}
            />
            {showDialog && <p>{userResponseText}</p>}
          </form>
          <table>
            <thead>
              <tr>
                <th>Edit history</th>
              </tr>
            </thead>
            <tbody>
              {occurrence.edits.map(({ editedAt }) => (
                <tr key={editedAt}>
                  <td>{editedAt}</td>
                </tr>
              ))}
              <tr>
                <td>{occurrence.createdAt}</td>
                <td>(created)</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
