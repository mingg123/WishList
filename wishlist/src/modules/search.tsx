const CHANGE_INPUT = "search/CHANGE_INPUT";

export const changeInput = (input: String) => ({
  type: CHANGE_INPUT,
  input,
});

const initialState = {
  input: "",
};

function search(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    default:
      return state;
  }
}

export default search;
