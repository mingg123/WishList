import { AxiosResponse } from "axios";
import { handleActions } from "redux-actions";
import { getWishAPI } from "../data/WishListDO";

const GET_LIST = "wishList/GET_LIST";
const GET_LIST_SUCCESS = "wishList/get_LIST_SUCCESS";
const GET_LIST_FAILURE = "wishList/GET_LIST_FAILURE";

const initialState = {
  loading: {
    GET_LIST: false,
  },
  lists: null,
};
const wishList = handleActions<any, any>(
  {
    [GET_LIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: true,
      },
    }),
    [GET_LIST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
    }),
    [GET_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: false,
      },
      lists: action.payload,
    }),
  },
  initialState
);
export const getList = (query: string) => async (dispatch: any) => {
  dispatch({ type: GET_LIST });
  try {
    const response = await getWishAPI(query);
    dispatch({
      type: GET_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_LIST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};
export default wishList;
