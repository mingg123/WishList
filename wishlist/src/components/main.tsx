import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { WishListDO } from "../data/WishListDO";
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../modules/search";
import { RootState } from "../modules";
import { getList } from "../modules/wishList";

export interface IMainProps {
  input: any;
  lists: WishListDO;
  loadingList?: any;
}
export interface WisiListsData {
  type?: string;
  payload?: any;
}
export const Main: React.FC<IMainProps> = ({ input, lists, loadingList }) => {
  const dispatch = useDispatch();
  const handleTextField = useCallback(
    (e) => {
      // onChangeInput(e.target.value);
      dispatch(changeInput(e.target.value));
      console.log(input);
    },
    [input, dispatch]
  );

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
        <ImageWrapper>
          <div>
            {
              lists && !loadingList && (
                <>
                  <li> {lists.title}</li>
                  <li>{lists.category} </li>
                  <li>{lists.address}</li>
                  <li>{lists.homePageLink}</li>
                  <li>{lists.imageLink}</li>
                </>
              )
              // lists.map((list: any) => (
              //   <li key={lists.index}>{lists.title}</li>
              // ))
            }
          </div>
        </ImageWrapper>
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
