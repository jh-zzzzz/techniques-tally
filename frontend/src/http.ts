const BACKEND_BASE_URI: string = "http://localhost:1523/api";

export const postTechnique = (sportName: string, techniqueName: string) => {
  return fetch(`${BACKEND_BASE_URI}/sports/${sportName}/techniques`, {
    method: "POST",
    body: techniqueName,
  });
};

export const getSports = () => {
  return fetch(`${BACKEND_BASE_URI}/sports`);
};

export const getOccurrences = (sportName: string, techniqueName: string) => {
  return fetch(
    `${BACKEND_BASE_URI}/sports/${sportName}/techniques/${techniqueName}/occurrences`,
  );
};

export const getTechniques = (sportName: string) => {
  return fetch(`${BACKEND_BASE_URI}/sports/${sportName}/techniques`);
};
