const initialState = { modalState: false };

export default (state = initialState, action) => {
  if (action.type === "SET_MODAL_STATE") {
    return {
      ...state,
      modalState: action.payload,
    };
  }

  return state;
};

export const setModalState = (state) => state.modalReducer.modalState;
