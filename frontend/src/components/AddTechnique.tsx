import { FormEvent } from "react";
import { useParams } from "react-router-dom";

type AddTechniqueEvent = FormEvent<HTMLFormElement> & {
  target: { techniqueName: { value: string } };
};

export const AddTechnique = () => {
  const params = useParams();

  const handleOnSubmit = (e: AddTechniqueEvent) => {
    e.preventDefault();
    fetch(`http://localhost:1523/api/sports/${params.sport}/techniques`, {
      method: "POST",
      body: e.target.techniqueName.value,
    })
      .then((resp) => console.log(resp.status))
      .catch(() => console.error("post req failed"));
  };
  return (
    <>
      <h2>{params.sport}</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="techniqueName">What's the name of the technique?</label>
        <input type="text" id="techniqueName" required />
        <input type="submit" />
      </form>
    </>
  );
};
