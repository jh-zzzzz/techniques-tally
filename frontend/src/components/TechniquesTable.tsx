import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTechniques } from "../http";

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
      getTechniques(sport)
        .then((resp) => resp.json())
        .then(({ data }) => setTechniques(data))
        .catch(() => console.error("couldnt fetch yo")); // TO DO
    }
  }, [sport]);

  const generateLink = (technique: Technique) => {
    return `${sport}/${technique.name.toLowerCase().replace(/ /g, "-")}`;
  };

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
                <Link to={generateLink(technique)}>{technique.name}</Link>
              </td>
              <td>{technique.totalNumberOfOccurrences}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
