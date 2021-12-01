import axios from "axios";
import { isProObjectError, WishListAxios } from "../utils/SpringAxios";

export interface WishListDO {
  index: number;
  title: String;
  category: String;
  address: String;
  readAddress: String;
  homePageLink: String;
  imageLink: String;
  isVisit: boolean;
  visitCount: number;
  lastVisitDate: String;
  //   LocalDateTime;
}

export const getWishAPI = (query: String) =>
  axios.get(`http://localhost:9091/springapi/restarant/search?query=${query}`);
// export const getWishLists = async (query: String) => {
//   const response = await WishListAxios.get<[WishListDO]>(
//     `search?query=${query}`
//   );
//   // console.log(response);
//   if (!isProObjectError(response)) return response.data;
//   // return {
//   //   type: "GET",
//   //   payload: response.data,
//   // };
// };
