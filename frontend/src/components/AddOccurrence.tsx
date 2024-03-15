import { FormEvent, MouseEventHandler, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postOccurrence } from "../http";

type AddOccurrenceEvent = FormEvent<HTMLFormElement> & {
  target: {
    date: { value: string };
    athlete: { value: string };
    game: { value: string };
    timestamp: { value: string };
    videoLink: { value: string };
  };
};

export const AddOccurrence = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [awaitingRespopnse, setAwaitingResponse] = useState<boolean>(false);
  const [userResponseText, setUserResponseText] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleOnSubmit = (e: AddOccurrenceEvent) => {
    e.preventDefault();

    const occurrenceToAdd = {
      date: e.target.date.value,
      athlete: e.target.athlete.value,
      game: e.target.game.value,
      timestamp: e.target.timestamp.value,
      videoLink: e.target.videoLink.value,
    };

    postOccurrence(params.sport!, params.technique!, occurrenceToAdd)
      .then((resp) => {
        switch (resp.status) {
          case 201:
            setUserResponseText("Added ✓");
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
              setAwaitingResponse(false);
              navigate(`/${params.sport}/${params.technique}`);
            }, 1500);
            break;
          case 409:
            // display "Seems like this occurence already axists in the database"
            setUserResponseText(
              "Seems like this occurence already exists in the database!",
            );
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 3000);
            setAwaitingResponse(false);
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
    navigate(`/${params.sport}/${params.technique}`);
  };

  return (
    <>
      <p>
        <Link to="/">Home</Link> {`> ${params.sport} > `}{" "}
        <Link
          to={`/${params.sport}/${params.technique}`}
        >{`${params.technique}`}</Link>
        {" > Add new occurrence"}
      </p>
      <h3>Add occurrence for:</h3>
      <h2>
        {params.technique} ({params.sport})
      </h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="date">Date *</label>
        <input type="date" id="date" required disabled={awaitingRespopnse} />

        <label htmlFor="athlete">Athlete *</label>
        <input type="text" id="athlete" required disabled={awaitingRespopnse} />

        <label htmlFor="game">Game *</label>
        <input type="text" id="game" required disabled={awaitingRespopnse} />

        <label htmlFor="timestamp">Timestamp *</label>
        <input
          type="text"
          id="timestamp"
          required
          disabled={awaitingRespopnse}
        />

        <label htmlFor="videoLink">Video link</label>
        <input type="url" id="videoLink" disabled={awaitingRespopnse} />

        <input type="submit" disabled={awaitingRespopnse} />
        <input
          type="button"
          value="Cancel"
          onClick={cancel}
          disabled={awaitingRespopnse}
        />
        {showDialog && <p>{userResponseText}</p>}
      </form>
    </>
  );
};
