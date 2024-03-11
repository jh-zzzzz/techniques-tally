import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
