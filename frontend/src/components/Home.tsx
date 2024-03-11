import { ChangeEvent, useEffect, useState } from "react";
import { TechniquesTable } from "./TechniquesTable";

export const Home = () => {
  const [sport, setSport] = useState<string>("");
  const [sports, setSports] = useState<string[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSport(e.currentTarget.value);
  };

  const fetchOnRender = async () => {
    await fetch("http://localhost:1523/api/sports")
      .then((resp) => resp.json())
      .then((json) => setSports(json));
    console.log("howdy");
    setSport(sports[0].toLowerCase());
  };

  useEffect(() => {
    fetchOnRender();
  }, []);

  return (
    <>
      <select onChange={handleOnChange}>
        {sports.map((sport) => (
          <option key={sport} value={sport.toLowerCase()}>
            {sport}
          </option>
        ))}
      </select>
      <button>Add new technique</button>
      <TechniquesTable sport={sport} />
    </>
  );
};
