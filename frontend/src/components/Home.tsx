import { useEffect, useState } from "react";
import { TechniquesTable } from "./TechniquesTable";

export const Home = () => {
  const [sport, setSport] = useState<string>();
  const [sports, setSports] = useState<string[]>([]);

  const fetchOnRender = async () => {
    await fetch("http://localhost:1523/api/sports")
      .then((resp) => resp.json())
      .then((json) => setSports(json));
  };

  useEffect(() => {
    fetchOnRender();
  }, []);

  return (
    <>
      <select>
        {sports.map((sport) => (
          <option key={sport}>{sport}</option>
        ))}
      </select>
      <button>Add new technique</button>
      <TechniquesTable />
    </>
  );
};
