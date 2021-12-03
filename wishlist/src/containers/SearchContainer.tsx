import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main } from "../components/main";
import { RootState } from "../modules";
import { changeInput } from "../modules/search";
import { getList, addWishList, getAllList } from "../modules/wishList";

interface SearchInfo {
  changeInput: any;
  input: String;
  loadingList: any;
}
const SearchContainer: React.FC<SearchInfo> = ({ loadingList }) => {
  const input = useSelector((state: RootState) => state.search.input);
  const list = useSelector((state: RootState) => state.wishList.list);
  const allList = useSelector((state: RootState) => state.wishList.allList);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // getList(input);
  //   // console.log(input);
  // }, [dispatch, getList]);
  return (
    <Main
      input={input}
      list={list}
      loadingList={loadingList}
      allList={allList}
    />
  );
};

// const mapStateToProps = (state: any) => ({
//   input: state.search.input,
//   list: state.wishList.list,
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
    list: wishList.list,
    input: search.input,
    loadingList: wishList.loading.GET_LIST,
    loadingAllList: wishList.loading.GET_ALL_LIST,
    allList: wishList.allList,
  }),
  {
    getList,
    changeInput,
    addWishList,
    getAllList,
  }
)(SearchContainer);
// export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
