import React from "react";
import { connect, useSelector } from "react-redux";
import { Main } from "../components/main";
import { RootState } from "../modules";
import { changeInput } from "../modules/search";

interface SearchInfo {
  changeInput: any;
  input: String;
}
const SearchContainer: React.FC<SearchInfo> = ({}) => {
  const input = useSelector((state: RootState) => state.search.input);
  return <Main input={input} />;
};

const mapStateToProps = (state: any) => ({
  input: state.search.input,
});

const mapDispatchToProps = (dispatch: any) => ({
  changeInput: (text: String) => {
    dispatch(changeInput(text));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
