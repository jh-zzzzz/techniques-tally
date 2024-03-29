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

export const postOccurrence = (
  sportName: string,
  techniqueName: string,
  body: any,
) => {
  return fetch(
    `${BACKEND_BASE_URI}/sports/${sportName}/techniques/${techniqueName}/occurrences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
};

export const getOccurrence = (id: string) => {
  return fetch(`${BACKEND_BASE_URI}/occurrences/${id}`);
};

export const updateOccurrence = (
  id: string,
  body: { timestamp: string; videoLink: string },
) => {
  return fetch(`${BACKEND_BASE_URI}/occurrences/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
