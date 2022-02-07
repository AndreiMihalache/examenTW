const INITIAL_STATE = {
  candidateList: [],
  error: null,
  fetching: false,
  fetched: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_CANDIDATES_PENDING":
    case "ADD_CANDIDATES_PENDING":
    case "UPDATE_CANDIDATES_PENDING":
    case "DELETE_CANDIDATES_PENDING":
      return { ...state, error: null, fetching: true, fetched: false };
    case "GET_CANDIDATES_FULFILLED":
    case "ADD_CANDIDATES_FULFILLED":
    case "UPDATE_CANDIDATES_FULFILLED":
    case "DELETE_CANDIDATES_FULFILLED":
      return {
        ...state,
        candidateList: action.payload,
        error: null,
        fetching: false,
        fetched: true,
      };

    case "GET_CANDIDATES_REJECTED":
    case "ADD_CANDIDATES_REJECTED":
    case "UPDATE_CANDIDATES_REJECTED":
    case "DELETE_CANDIDATES_REJECTED":
      return {
        ...state,
        candidateList: [],
        error: action.payload,
        fetching: false,
        fetched: true,
      };

    default:
      return state;
  }
}
