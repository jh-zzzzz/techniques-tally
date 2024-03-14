import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { postTechnique } from "../http";

type AddTechniqueEvent = FormEvent<HTMLFormElement> & {
  target: { techniqueName: { value: string } };
};

export const AddTechnique = () => {
  const params = useParams();

  const handleOnSubmit = (e: AddTechniqueEvent) => {
    e.preventDefault();
    postTechnique(params.sport!, e.target.techniqueName.value)
      .then((resp) => console.log(resp.status))
      .catch(() => console.error("post req failed"));
  };
  return (
    <>
      <p>
        <Link to="/">Home</Link> {`> ${params.sport} > Add new technique`}
      </p>
      <h2>{params.sport}</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="techniqueName">What's the name of the technique?</label>
        <input type="text" id="techniqueName" required />
        <input type="submit" />
      </form>
    </>
  );
};
