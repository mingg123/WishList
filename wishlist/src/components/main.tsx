import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import { WishListDO } from "../data/WishListDO";
import { useDispatch } from "react-redux";
import { changeInput } from "../modules/search";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getList } from "../modules/wishList";
import { debounce, throttle } from "lodash";
import { MYWishListComponent } from "./MyWishListComponent";
import { ImageResultComponent } from "./ImageResultComponent";

export interface IMainProps {
  input: string;
  list: WishListDO | null;
  allList: WishListDO[] | null;
  loadingList?: any;
}
export interface WisilistData {
  type?: string;
  payload?: any;
}
export interface ImageContentProps {
  title: string;
  content?: string;
}
export const Main: React.FC<IMainProps> = ({
  input,
  list,
  loadingList,
  allList,
}) => {
  const dispatch = useDispatch();

  const onDebounceApply = debounce((e: any) => {
    onClickApply(e);
  }, 1000);

  //각 단어는 한개 입력받은 이후 500ms 후에 입력 받음
  // 입력 후 1000ms 후에 검색 api 날라감
  const onDebounceChange = debounce((e) => {
    handleTextField(e);
    console.log(e.target.value);
    setTimeout(() => {
      onDebounceApply(e);
    }, 500);
  }, 500);

  const handleTextField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(changeInput(e.target.value));
  };

  const onClickApply = useCallback(
    async (e) => {
      dispatch(getList(input));
    },
    [input, dispatch]
  );

  return (
    <Wrapper>
      <SearchWrapper>
        <StyledTextField
          placeholder="위시리스트에 추가 할 내용을 입력해주세요"
          variant="outlined"
          // onChange={handleTextField}
          onChange={onDebounceChange}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              onClickApply(e);
            }
          }}
        ></StyledTextField>
        <StyledButton variant="contained">검색</StyledButton>
      </SearchWrapper>
      <ImageResultComponent
        list={list}
        allList={allList}
        loadingList={loadingList}
        showAll={false}
      />
      <MYWishListComponent allList={allList} />
    </Wrapper>
  );
};

export const Wrapper = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingBottom: 100,
}));

export const TitleWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "#B4C3FF",
  marginTop: 100,
  height: 50,
  minHeight: 50,
}));

export const ResultTitle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "80%",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "20%",
  backgroundColor: "#B4C3FF",
  color: "black",
}));

export const ResultWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid #d3d3d3",
  padding: "2em",
}));

export const AllResultWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
export const ImageWrapper = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  justifyContent: "center",
  minWidth: 500,
  minHeight: 500,
}));

export const ImageInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const ImageContentContainer = styled("div")(({ theme }) => ({
  minWidth: "500px",
  maxWidth: "500px",
  minHeight: "50px",
  borderBottom: "1px solid #d3d3d3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const ImageContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

export const StyledButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: 20,
}));

export const StyledImageButton = styled(Button)(({ theme }) => ({
  minWidth: "300px",
  minHeight: "50px",
  backgroundColor: "#B4C3FF",
  color: "black",
}));

export const MyWishListContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  // marginTop: 100,
}));

export const DownIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}));
export const StyledDownIcon = styled(ArrowDownIcon)(({ theme }) => ({
  width: "4em",
  height: "4em",
}));
