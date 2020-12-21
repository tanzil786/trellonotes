import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from "../actions/types";

export default (state = { notes: [] }, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes.map((note) => {
            if (note.id === action.payload.id) {
              return { ...action.payload };
            }
            return note;
          }),
        ],
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: [...state.notes.filter((note) => note.id !== action.payload.id)],
      };
    default:
      return state;
  }
};
