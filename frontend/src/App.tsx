import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Technique } from "./components/Technique";
import { useEffect, useState } from "react";

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
        <Route path=":sport/techniques/:technique" element={<Technique />} />
      </Routes>
    </>
  );
}

export default App;
