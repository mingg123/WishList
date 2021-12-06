import { AxiosResponse } from "axios";

export default function createRequestThunk(
  type: any,
  successType: any,
  failureType: any,
  request: any
) {
  //아래가 왜안되는지 모르겠으나 disptach에서 정상동작 안함
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params: any) => async (dispatch: any) => {
    dispatch({ type });
    try {
      const response = await request(params);
      dispatch({
        // type: SUCCESS,
        type: successType,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        //   type : FAILURE,
        type: failureType,
        payload: e,
        error: true,
      });
      throw e;
    }
  };
}
