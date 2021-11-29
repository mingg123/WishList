import React from "react";
import { connect } from "react-redux";
import { Main } from "../components/main";
import { changeInput } from "../modules/search";

interface SearchInfo {
  changeInput: any;
  input: String;
}
const SearchContainer: React.FC<SearchInfo> = ({ changeInput, input }) => {
  return <Main onChangeInput={changeInput} input={input} />;
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
