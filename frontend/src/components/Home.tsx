import { TechniquesTable } from "./TechniquesTable";

export const Home = () => {
  return (
    <>
      <select>
        <option>Football</option>
        <option>BJJ</option>
      </select>
      <button>Add new technique</button>
      <TechniquesTable />
    </>
  );
};
