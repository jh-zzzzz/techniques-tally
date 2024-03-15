import { FormEvent, MouseEventHandler, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postTechnique } from "../http";

type AddTechniqueEvent = FormEvent<HTMLFormElement> & {
  target: { techniqueName: { value: string } };
};

export const AddTechnique = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [awaitingRespopnse, setAwaitingResponse] = useState<boolean>(false);
  const [userResponseText, setUserResponseText] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleOnSubmit = (e: AddTechniqueEvent) => {
    e.preventDefault();
    setAwaitingResponse(true);
    postTechnique(params.sport!, e.target.techniqueName.value)
      .then((resp) => {
        switch (resp.status) {
          case 201:
            setUserResponseText("Added ✓");
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
              setAwaitingResponse(false);
              navigate("/");
            }, 1500);
            break;
          case 409:
            setUserResponseText("That technique already exists!");
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 3000);
            setAwaitingResponse(false);
            break;
          default:
            setUserResponseText(
              `Unexpected error. HTTP status code: ${resp.status}. Try again later`,
            );
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 3000);
            setAwaitingResponse(false);
        }
      })
      .catch(() => {
        setUserResponseText("Unable to reach server. Try again later");
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 3000);
      });
  };

  const cancel: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <p>
        <Link to="/">Home</Link> {`> ${params.sport} > Add new technique`}
      </p>
      <h2>{params.sport}</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="techniqueName">
          What's the name of the technique? *
        </label>
        <input
          type="text"
          id="techniqueName"
          required
          disabled={awaitingRespopnse}
        />
        <input type="submit" disabled={awaitingRespopnse} />
        <input
          type="button"
          value="Cancel"
          onClick={cancel}
          disabled={awaitingRespopnse}
        />
        {showDialog && <p>{userResponseText}</p>}
      </form>
    </>
  );
};
