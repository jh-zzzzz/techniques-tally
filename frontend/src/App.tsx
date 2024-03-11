import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Technique } from "./components/Technique";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path=":sport/techniques/:technique" element={<Technique />} />
      </Routes>
    </>
  );
}

export default App;
