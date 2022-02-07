import { SERVER } from "../config/global";

export const getCandidates = (jobpostingId) => {
  return {
    type: "GET_CANDIDATES",
    payload: async () => {
      const response = await fetch(
        `${SERVER}/jobpostings/${jobpostingId}/candidates`
      );
      const data = await response.json();
      return data;
    },
  };
};

export const addCandidate = (candidate, jobpostingId) => {
  return {
    type: "ADD_CANDIDATES",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/jobpostings/${jobpostingId}/candidates`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(candidate),
        }
      );
      response = await fetch(
        `${SERVER}/jobpostings/${jobpostingId}/candidates`
      );
      const data = await response.json();
      return data;
    },
  };
};

export const updateCandidate = (candidateId, candidate, jobpostingId) => {
  return {
    type: "UPDATE_CANDIDATES",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/jobpostings/${jobpostingId}/candidates/${candidateId}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(candidate),
        }
      );
      response = await fetch(
        `${SERVER}/jobpostings/${jobpostingId}/candidates`
      );
      const data = await response.json();
      return data;
    },
  };
};

export const deleteCandidate = (jobpostingId, candidateId) => {
  return {
    type: "DELETE_CANDIDATE",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/jobpostings/${jobpostingId}/candidates/${candidateId}`,
        {
          method: "delete",
        }
      );
      response = await fetch(`${SERVER}/jobpostings`);
      const data = await response.json();
      return data;
    },
  };
};
