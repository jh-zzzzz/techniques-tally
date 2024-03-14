import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOccurrence, updateOccurrence } from "../http";

type EditOccurrenceEvent = FormEvent<HTMLFormElement> & {
  target: {
    timestamp: { value: string };
    videoLink: { value: string };
  };
};

export const EditOccurrence = () => {
  const { sport, technique, id } = useParams();
  const [occurrence, setOccurrence] = useState();

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
      .then((resp) => resp.json())
      .then((data) => setOccurrence(data))
      .catch(() =>
        console.log("failed to fetch when sending patch request for occurence"),
      );
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
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              defaultValue={occurrence.date}
              disabled
            />

            <label htmlFor="athlete">Athlete</label>
            <input
              type="text"
              id="athlete"
              defaultValue={occurrence.athlete}
              disabled
            />

            <label htmlFor="game">Game</label>
            <input
              type="text"
              id="game"
              defaultValue={occurrence.game}
              disabled
            />

            <label htmlFor="timestamp">Timestamp</label>
            <input
              type="text"
              id="timestamp"
              defaultValue={occurrence.timestamp}
              required
            />

            <label htmlFor="videoLink">Video link</label>
            <input
              type="url"
              id="videoLink"
              defaultValue={occurrence.videoLink}
            />

            <input type="submit" value="Edit" className="edit" />
            <input type="button" value="Cancel" />
          </form>
          <table>
            <thead>
              <tr>
                <th>Edit history</th>
              </tr>
            </thead>
            <tbody>
              {occurrence.edits.map((edit) => (
                <tr key={edit.editedAt}>
                  <td>{edit.editedAt}</td>
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
