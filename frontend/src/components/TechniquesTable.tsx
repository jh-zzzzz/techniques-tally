import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TechniquesTableProps = {
  sport: string;
};

type Technique = {
  name: string;
  totalNumberOfOccurrences: number;
};

export const TechniquesTable = ({ sport }: TechniquesTableProps) => {
  const [techniques, setTechniques] = useState<Technique[]>([]);

  useEffect(() => {
    if (sport) {
      fetch(`http://localhost:1523/api/sports/${sport}/techniques`)
        .then((resp) => resp.json())
        .then(({ data }) => setTechniques(data))
        .catch(() => console.error("couldnt fetch yo")); // TO DO
    }
  }, [sport]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Technique</th>
            <th>total # of occurences</th>
          </tr>
        </thead>
        <tbody>
          {techniques.map((technique) => (
            <tr key={technique.name}>
              <td>
                <Link
                  to={`${sport}/techniques/${technique.name.toLowerCase()}`}
                >
                  {technique.name}
                </Link>
              </td>
              <td>{technique.totalNumberOfOccurrences}</td>
            </tr>
          ))}
          {/* <tr>
            <td>
              <Link to={`${sport}/techniques/nutmeg`}>Nutmeg</Link>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <Link to={`${sport}/techniques/step-over`}>Step over</Link>
            </td>
            <td>1</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};
