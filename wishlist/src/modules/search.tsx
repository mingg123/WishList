const CHANGE_INPUT = "search/CHANGE_INPUT";

const initialState = {
  input: "",
};

// export const changeInput = createAction(CHANGE_INPUT, (input: String) => input);

// const search = createReducer(initialState).handleAction(changeInput, (state: any, {payload}) => {
//   ...state,
//   input : payload.input,
// })

export const changeInput = (input: String) => ({
  type: CHANGE_INPUT,
  input,
});

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
