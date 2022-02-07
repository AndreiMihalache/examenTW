const INITIAL_STATE = {
  jobpostingList: [],
  length: 0,
  error: null,
  fetching: false,
  fetched: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_JOBS_PENDING":
    case "ADD_JOBS_PENDING":
    case "UPDATE_JOBS_PENDING":
    case "DELETE_JOBS_PENDING":
      return { ...state, error: null, fetching: true, fetched: false };
    case "GET_JOBS_FULFILLED":
    case "ADD_JOBS_FULFILLED":
    case "UPDATE_JOBS_FULFILLED":
    case "DELETE_JOBS_FULFILLED":
      return {
        ...state,
        jobpostingList: action.payload.content,
        length: action.payload.length,
        error: null,
        fetching: false,
        fetched: true,
      };

    case "GET_JOBS_REJECTED":
    case "ADD_JOBS_REJECTED":
    case "UPDATE_JOBS_REJECTED":
    case "DELETE_JOBS_REJECTED":
      return {
        ...state,
        jobpostingList: [],
        error: action.payload,
        fetching: false,
        fetched: true,
      };

    default:
      return state;
  }
}
