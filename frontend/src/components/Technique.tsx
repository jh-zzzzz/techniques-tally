import { useParams } from "react-router-dom";
import { Occurence, OccurencesTable } from "./OccurencesTable";
import { useEffect, useState } from "react";

export const Technique = () => {
  const params = useParams();
  const [occurences, setOccurences] = useState<Occurence[]>([]);

  const getOccurences = async () => {
    try {
      console.log("fetching...");
      const resp = await fetch("localhost:1337"); // TO DO
      const { data } = await resp.json();
      setOccurences(data);
      console.log(data);
      console.log("tjabba");
    } catch (err: any) {
      console.log("failed to fetch");
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
      <OccurencesTable occurences={occurences} />
      <p>
        sport: {params.sport} <br />
        technique: {params.technique}
      </p>
    </>
  );
};
