import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getWishLists } from "../data/WishListDO";

export interface IMainProps {
  onChangeInput: any;
  input: any;
}
export const Main: React.FC<IMainProps> = ({ onChangeInput, input }) => {
  const handleTextField = useCallback(
    (e) => {
      onChangeInput(e.target.value);
      console.log(input);
    },
    [input, onChangeInput]
  );

  const onClickApply = useCallback(
    async (e) => {
      console.log(input);
      const data = await getWishLists(input!);
      console.log(data);
    },
    [input, onChangeInput]
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
