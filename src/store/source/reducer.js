const initialState = { sources: [] };

export default (state = initialState, action) => {
  if (action.type === "SET_SOURCE_DATA") {
    return {
      ...state,
      sources: action.payload,
    };
  }

  return state;
};

export const setSourceData = (state) => state.sourceReducer.sources;
