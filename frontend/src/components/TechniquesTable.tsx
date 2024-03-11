import { Link } from "react-router-dom";

type TechniquesTableProps = {
  sport: string;
};

export const TechniquesTable = ({ sport }: TechniquesTableProps) => {
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
          <tr>
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
          </tr>
        </tbody>
      </table>
    </>
  );
};
