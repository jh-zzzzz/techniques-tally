export type Occurence = {
  id: string;
  date: string;
  athlete: string;
  game: string;
  timestamp: string;
  video_link: string;
};

type OccurenceTableProps = {
  occurences: Occurence[];
};

export const OccurencesTable = ({ occurences }: OccurenceTableProps) => {
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
          </tr>
        </thead>
        <tbody>
          {occurences.map((occurence) => (
            <tr className="occurence" key={occurence.id}>
              <td>{occurence.date}</td>
              <td>{occurence.athlete}</td>
              <td>{occurence.game}</td>
              <td>{occurence.timestamp}</td>
              <td>{occurence.video_link}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
