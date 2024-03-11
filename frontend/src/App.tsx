import "./App.css";
import { Nav } from "./components/Nav";
import { TechniquesTable } from "./components/TechniquesTable";

function App() {
  return (
    <>
      <Nav />
      <select>
        <option>Football</option>
        <option>BJJ</option>
      </select>
      <button>Add new technique</button>
      <TechniquesTable />
    </>
  );
}

export default App;
