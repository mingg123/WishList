import { AxiosResponse } from "axios";
import { off } from "process";
import { Dispatch } from "redux";
import { handleActions } from "redux-actions";
import { Action, action } from "typesafe-actions";
import {
  addVisitAPI,
  addWishListAPI,
  deleteWishListAPI,
  getAllWishListAPI,
  getWishAPI,
  WishListDO,
} from "../data/WishListDO";

const GET_LIST = "wishList/GET_LIST";
const GET_LIST_SUCCESS = "wishList/get_LIST_SUCCESS";
const GET_LIST_FAILURE = "wishList/GET_LIST_FAILURE";

const POST_WISHLIST = "wishList/POST_WISHLIST";
const POST_WISHLIST_SUCCESS = "wishList/POST_WISHLIST_SUCCESS";
const POST_WISHLIST_FAILURE = "wishList/POST_WISHLIST_FAILURE";

const POST_VISIT = "wishList/POST_VISIT";

const GET_ALL_LIST = "wishList/GET_ALL_LIST";
const GET_ALL_LIST_SUCCESS = "wishList/GET_ALL_LIST_SUCCESS";
const GET_ALL_LIST_FAILURE = "wishList/GET_ALL_LIST_FAILURE";

const DELETE_LIST = "wishList/DELETE_LIST";
const DELETE_LIST_SUCCESS = "wishList/DELETE_LIST_SUCCESS";
const DELETE_LIST_FAILURE = "wishList/DELETE_LIST_FAILURE";

interface WishListResult {
  loading: {
    GET_LIST: boolean;
    GET_ALL_LIST: boolean;
  };
  list: WishListDO | null;
  allList: WishListDO[] | null;
}
const initialState: WishListResult = {
  loading: {
    GET_LIST: false,
    GET_ALL_LIST: false,
  },
  list: null,
  allList: null,
};
const wishList = handleActions<WishListResult, any>(
  {
    [DELETE_LIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_LIST: true,
      },
    }),
    [DELETE_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_LIST: false,
      },
      allList: action.payload,
    }),
    [DELETE_LIST_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_LIST: false,
      },
    }),
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
    [POST_WISHLIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        POST_WISHLIST: true,
      },
    }),
    [POST_WISHLIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        POST_WISHLIST: false,
      },
      allList: action.payload,
    }),
    [POST_WISHLIST_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        POST_WISHLIST: false,
      },
    }),
  },
  initialState
);

export const getList =
  (query: string) => async (dispatch: Dispatch<Action>) => {
    const queryParm = query ? query : "피자";
    dispatch({ type: GET_LIST });
    try {
      const response = await getWishAPI(queryParm);
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

export const getAllList = () => async (dispatch: Dispatch<Action>) => {
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
export const addWishList =
  (data: WishListDO) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: POST_WISHLIST });
    try {
      const response = await addWishListAPI(data);
      dispatch({
        type: POST_WISHLIST_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: POST_WISHLIST_FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    }
  };

export const addVisit = (idx: number) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: POST_VISIT });
  try {
    const response = await addVisitAPI(idx);
  } catch (e) {
    console.log("방문 추가 실패");
    throw e;
  }
};
export const deleteList =
  (idx: number) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: DELETE_LIST });
    try {
      const response = await deleteWishListAPI(idx);
      dispatch({ type: DELETE_LIST_SUCCESS, payload: response.data });
    } catch (e) {
      console.log("위시리스트 삭제 실패");
      dispatch({
        type: DELETE_LIST_FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    }
  };
export default wishList;
