import { Link } from "react-router-dom";

export type Occurrence = {
  id: string;
  date: string;
  athlete: string;
  game: string;
  timestamp: string;
  video_link: string;
};

type OccurrenceTableProps = {
  occurences: Occurrence[];
};

export const OccurencesTable = ({ occurences }: OccurrenceTableProps) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Athlete</th>
            <th>Game</th>
            <th>Timestamp</th>
            <th>Video link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {occurences.map((occurence) => (
            <tr className="occurrence" key={occurence.id}>
              <td>{occurence.date}</td>
              <td>{occurence.athlete}</td>
              <td>{occurence.game}</td>
              <td>{occurence.timestamp}</td>
              <td>{occurence.video_link}</td>
              <td>
                <Link to={`occurrence/${occurence.id}`}>Edit entry</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
