import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TechniquesTable } from "./TechniquesTable";
import { Link } from "react-router-dom";

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
      <Link to={`${sport}/add-technique`}>Add new technique</Link>
      <TechniquesTable sport={sport} />
    </>
  );
};
