import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getWishLists, WishListDO } from "../data/WishListDO";
import { useDispatch } from "react-redux";
import { changeInput } from "../modules/search";

export interface IMainProps {
  input: any;
}
export interface WisiListsData {
  type?: string;
  payload?: any;
}
export const Main: React.FC<IMainProps> = ({ input }) => {
  const dispatch = useDispatch();
  const handleTextField = useCallback(
    (e) => {
      // onChangeInput(e.target.value);
      dispatch(changeInput(e.target.value));
      console.log(input);
    },
    [input, dispatch]
  );

  let data: WisiListsData;
  const onClickApply = useCallback(
    async (e) => {
      console.log(input);
      const wishList = await getWishLists(input!);
      if (wishList) {
        data = wishList;
      }
      console.log(data);
    },
    [input, dispatch]
  );

  return (
    <Wrapper>
      <SearchWrapper>
        <StyledTextField
          variant="outlined"
          onChange={handleTextField}
        ></StyledTextField>
        <StyledButton onClick={onClickApply} variant="contained">
          검색
        </StyledButton>
      </SearchWrapper>
      <TitleWrapper>
        <ResultTitle>나의 맛집 리스트</ResultTitle>
      </TitleWrapper>
      <ResultWrapper>
        <ImageWrapper>left</ImageWrapper>
        <ImageInfoContainer>right</ImageInfoContainer>
      </ResultWrapper>
    </Wrapper>
  );
};

export const Wrapper = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
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
  height: 50,
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
  paddingTop: 100,
}));

export const ImageWrapper = styled("div")(({ theme }) => ({
  width: "60%",
}));

export const ImageInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
