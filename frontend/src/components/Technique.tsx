import { Link, useParams } from "react-router-dom";
import { Occurrence, OccurencesTable } from "./OccurencesTable";
import { useEffect, useState } from "react";
import { getOccurrences } from "../http";

export const Technique = () => {
  const params = useParams();
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  useEffect(() => {
    if (occurrences.length === 0) {
      getOccurrences(params.sport!, params.technique!)
        .then((resp) => resp.json())
        .then(({ data }) => setOccurrences(data))
        .catch(() => console.error("failed to fetch"));
    }
  }, [occurrences]);

  return (
    <>
      <p>
        <Link to="/">Home</Link> {`> ${params.sport} > ${params.technique}`}
      </p>
      <h2>{params.technique}</h2>
      <Link to={`add-occurrence`}>Add new occurrence</Link>
      <OccurencesTable occurences={occurrences} />
    </>
  );
};
