import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Technique } from "./components/Technique";
import { useEffect, useState } from "react";
import { AddTechnique } from "./components/AddTechnique";
import { AddOccurrence } from "./components/AddOccurrence";
import { getSports } from "./http";
import { EditOccurrence } from "./components/EditOccurrrence";

function App() {
  const [sports, setSports] = useState<string[]>([]);
  const [sport, setSport] = useState<string>("");

  const fetchOnRender = async () => {
    return await getSports().then((resp) => resp.json());
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
          path="/:sport/:technique/occurrence/:id"
          element={<EditOccurrence />}
        />
        <Route
          path="/:sport/:technique/add-occurrence"
          element={<AddOccurrence />}
        />
      </Routes>
    </>
  );
}

export default App;
