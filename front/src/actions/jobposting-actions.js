import { SERVER } from "../config/global";

export const getJobPostings = () => {
  return {
    type: "GET_JOBS",
    payload: async () => {
      const response = await fetch(`${SERVER}/jobpostings`);
      const data = await response.json();
      return data;
    },
  };
};

export const getSortedJobPostings = (order) => {
  return {
    type: "GET_JOBS",
    payload: async () => {
      let response = null;
      if (order === 0)
        response = await fetch(`${SERVER}/jobpostings?sortBy=deadline:asc`);
      else response = await fetch(`${SERVER}/jobpostings?sortBy=deadline:desc`);
      const data = await response.json();
      return data;
    },
  };
};

export const addJobPosting = (jobposting) => {
  return {
    type: "ADD_JOBS",
    payload: async () => {
      let response = await fetch(`${SERVER}/jobpostings`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobposting),
      });
      response = await fetch(`${SERVER}/jobpostings`);
      const data = await response.json();
      return data;
    },
  };
};

export const updateJobPosting = (id, jobposting) => {
  return {
    type: "UPDATE_JOBS",
    payload: async () => {
      let response = await fetch(`${SERVER}/jobpostings/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobposting),
      });
      response = await fetch(`${SERVER}/jobpostings`);
      const data = await response.json();
      return data;
    },
  };
};

export const deleteJobPosting = (jobpostingId) => {
  return {
    type: "DELETE_JOBS",
    payload: async () => {
      let response = await fetch(`${SERVER}/jobpostings/${jobpostingId}`, {
        method: "delete",
      });
      response = await fetch(`${SERVER}/jobpostings`);
      const data = await response.json();
      return data;
    },
  };
};
