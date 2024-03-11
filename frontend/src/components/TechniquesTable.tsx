import { Link } from "react-router-dom";

export const TechniquesTable = () => {
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
              <Link to="football/techniques/nutmeg">Nutmeg</Link>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <Link to="football/techniques/step-over">Step over</Link>
            </td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
