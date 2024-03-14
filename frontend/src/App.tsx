import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Technique } from "./components/Technique";
import { useEffect, useState } from "react";
import { AddTechnique } from "./components/AddTechnique";
import { AddOccurrence } from "./components/AddOccurrence";

function App() {
  const [sports, setSports] = useState<string[]>([]);
  const [sport, setSport] = useState<string>("");

  const fetchOnRender = async () => {
    return await fetch("http://localhost:1523/api/sports").then((resp) =>
      resp.json(),
    );
  };

  useEffect(() => {
    fetchOnRender().then((data) => {
      setSports(data);
      setSport(data[0].toLowerCase());
    });
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home sports={sports} sport={sport} setSport={setSport} />}
        ></Route>
        <Route path="/:sport/add-technique" element={<AddTechnique />} />
        <Route path="/:sport/:technique" element={<Technique />} />
        <Route
          path="/:sport/:technique/add-occurrence"
          element={<AddOccurrence />}
        />
      </Routes>
    </>
  );
}

export default App;
