import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TechniquesTable } from "./TechniquesTable";

type HomeProps = {
  sports: string[];
  sport: string;
  setSport: Dispatch<SetStateAction<string>>;
};

export const Home = ({ sports, sport, setSport }: HomeProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSport(e.currentTarget.value);
  };

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
