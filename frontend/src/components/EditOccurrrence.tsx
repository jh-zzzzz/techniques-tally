import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOccurrence } from "../http";

type EditOccurrenceEvent = FormEvent<HTMLFormElement> & {
  target: {
    timestamp: { value: string };
    videoLink: { value: string };
  };
};

export const EditOccurrence = () => {
  const params = useParams();
  const [occurrence, setOccurrence] = useState();

  useEffect(() => {
    getOccurrence(params.sport!, params.technique!, params.id!)
      .then((resp) => resp.json())
      .then((data) => setOccurrence(data))
      .then(() => console.log(occurrence))
      .catch(() => console.log("couldnt fetch occurrence"));
  }, []);

  const handleOnSubmit = () => {};

  return (
    occurrence && (
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

          <input type="submit" />
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
          </tbody>
        </table>
      </>
    )
  );
};
