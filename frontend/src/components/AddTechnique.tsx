import { FormEvent } from "react";
import { useParams } from "react-router-dom";

export const AddTechnique = () => {
  const params = useParams();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:1523/api/${params.sport}/techniques`);
  };
  return (
    <>
      <h2>{params.sport}</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="technique-name">
          What's the name of the technique?
        </label>
        <input type="text" id="technique-name" required />
        <input type="submit" />
      </form>
    </>
  );
};
