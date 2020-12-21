import { UPDATE_SORT_BY } from "../actions/types";

export default (state = { sortBy: "title" }, action) => {
  switch (action.type) {
    case UPDATE_SORT_BY:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};
