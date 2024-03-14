import { Link, useParams } from "react-router-dom";
import { Occurrence, OccurencesTable } from "./OccurencesTable";
import { useEffect, useState } from "react";

export const Technique = () => {
  const params = useParams();
  const [occurences, setOccurences] = useState<Occurrence[]>([]);

  const getOccurences = async () => {
    try {
      const resp = await fetch(
        `http://localhost:1523/api/sports/${params.sport}/techniques/${params.technique}/occurrences`,
      );
      const { data } = await resp.json();
      setOccurences(data);
    } catch (err: any) {
      console.log("failed to fetch"); // TO DO
    }
  };

  useEffect(() => {
    if (occurences.length === 0) {
      getOccurences();
    }
  }, [occurences]);

  return (
    <>
      <h2>{params.technique}</h2>
      <Link to={`add-occurrence`}>add new occurrence</Link>
      <OccurencesTable occurences={occurences} />
      <p>
        sport: {params.sport} <br />
        technique: {params.technique}
      </p>
    </>
  );
};
