import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <h1>Techniques Tally</h1>
      <select>
        <option>Football</option>
        <option>BJJ</option>
      </select>
      <button>Add new technique</button>
      <table>
        <thead>
          <tr>
            <th>Technique</th>
            <th>total # of occurences</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nutmeg</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Step over</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
