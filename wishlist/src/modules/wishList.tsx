import { AxiosResponse } from "axios";
import { handleActions } from "redux-actions";
import { action } from "typesafe-actions";
import {
  addWishListAPI,
  getAllWishListAPI,
  getWishAPI,
  WishListDO,
} from "../data/WishListDO";

const GET_LIST = "wishList/GET_LIST";
const GET_LIST_SUCCESS = "wishList/get_LIST_SUCCESS";
const GET_LIST_FAILURE = "wishList/GET_LIST_FAILURE";

const POST_VISIT = "wishList/POST_VISIT";

const GET_ALL_LIST = "wishList/GET_ALL_LIST";
const GET_ALL_LIST_SUCCESS = "wishList/GET_ALL_LIST_SUCCESS";
const GET_ALL_LIST_FAILURE = "wishList/GET_ALL_LIST_FAILURE";

const initialState = {
  loading: {
    GET_LIST: false,
    GET_ALL_LIST: false,
  },
  list: null,
  allList: null,
};
const wishList = handleActions<any, any>(
  {
    [GET_ALL_LIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ALL_LIST: true,
      },
    }),
    [GET_ALL_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ALL_LIST: false,
      },
      allList: action.payload,
    }),
    [GET_ALL_LIST_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ALL_LIST: false,
      },
    }),
    [GET_LIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_LIST: true,
      },
    }),
    [GET_LIST_FAILURE]: (state) => ({
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
      list: action.payload,
    }),
    [POST_VISIT]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        POST_VISIT: true,
      },
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

export const getAllList = () => async (dispatch: any) => {
  dispatch({ type: GET_ALL_LIST });
  try {
    const response = await getAllWishListAPI();
    dispatch({
      type: GET_ALL_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_LIST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};
export const addWishList = (data: WishListDO) => async (dispatch: any) => {
  dispatch({ type: POST_VISIT });
  try {
    const response = await addWishListAPI(data);
  } catch (e) {
    console.log("위시리스트 추가 실패");
    throw e;
  }
};
export default wishList;
