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
export const getWishLists = async (query: String) => {
  const response = await WishListAxios.get<[WishListDO]>(
    `search?query=${query}`
  );
  console.log(response);
  if (!isProObjectError(response))
    return {
      type: "GET",
      payload: response.data,
    };
};
