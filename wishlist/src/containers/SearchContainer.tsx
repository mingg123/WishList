import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main } from "../components/main";
import { RootState } from "../modules";
import { changeInput } from "../modules/search";
import { getList, addWishList } from "../modules/wishList";

interface SearchInfo {
  changeInput: any;
  input: String;
  loadingList: any;
}
const SearchContainer: React.FC<SearchInfo> = ({ loadingList }) => {
  const input = useSelector((state: RootState) => state.search.input);
  const lists = useSelector((state: RootState) => state.wishList.lists);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // getList(input);
  //   // console.log(input);
  // }, [dispatch, getList]);
  return <Main input={input} lists={lists} loadingList={loadingList} />;
};

// const mapStateToProps = (state: any) => ({
//   input: state.search.input,
//   list: state.wishList.lists,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   changeInput: (text: String) => {
//     dispatch(changeInput(text));
//   },
//   getList: (query: string) => {
//     dispatch(getList(query));
//   },
// });

export default connect(
  ({ search, wishList }: RootState) => ({
    lists: wishList.lists,
    input: search.input,
    loadingList: wishList.loading.GET_LIST,
  }),
  {
    getList,
    changeInput,
    addWishList,
  }
)(SearchContainer);
// export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
