import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
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
      .then((resp) => console.log(resp.status))
      .catch(() => console.error("post req failed"));
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
      <h3>add occurrence for:</h3>
      <h2>
        {params.technique} ({params.sport})
      </h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" required />

        <label htmlFor="athlete">Athlete</label>
        <input type="text" id="athlete" required />

        <label htmlFor="game">Game</label>
        <input type="text" id="game" required />

        <label htmlFor="timestamp">Timestamp</label>
        <input type="text" id="timestamp" required />

        <label htmlFor="videoLink">Video link</label>
        <input type="url" id="videoLink" />

        <input type="submit" />
      </form>
    </>
  );
};
