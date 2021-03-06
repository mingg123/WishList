import axios from "axios";
import { isProObjectError, WishListAxios } from "../utils/SpringAxios";

export interface WishListDO {
  index: number;
  title: string;
  category: string;
  address: string;
  readAddress: string;
  homePageLink: string;
  imageLink: string;
  visit: boolean;
  visitCount: number;
  lastVisitDate: string;
}

export const getWishAPI = (query: String) =>
  axios.get(`http://localhost:9091/springapi/restarant/search?query=${query}`);
// export const getWishlist = async (query: String) => {
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

export const addWishListAPI = (data: WishListDO) =>
  axios.post(`http://localhost:9091/springapi/restarant/`, data);

export const getAllWishListAPI = () =>
  axios.get(`http://localhost:9091/springapi/restarant/all`);

export const deleteWishListAPI = (index: number) =>
  axios.delete(`http://localhost:9091/springapi/restarant/${index}`);

export const addVisitAPI = (index: number) =>
  axios.post(`http://localhost:9091/springapi/restarant/${index}`);
