import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { WishListDO } from "../data/WishListDO";
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../modules/search";
import { RootState } from "../modules";
import { addWishList, getList } from "../modules/wishList";
export interface IMainProps {
  input: string;
  lists: WishListDO;
  loadingList?: any;
}
export interface WisiListsData {
  type?: string;
  payload?: any;
}
export interface ImageContentProps {
  title: string;
  content?: string;
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

  const onClickAddWishList = useCallback(
    async (e) => {
      dispatch(addWishList(lists));
    },
    [input, lists, dispatch]
  );

  const onClickDeleteWish = useCallback(() => {
    console.log("delete");
  }, []);

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
          {lists && !loadingList && (
            <img
              src={lists.imageLink}
              style={{ maxHeight: "500px", maxWidth: "500px" }}
            />
          )}
        </ImageWrapper>
        <ImageInfoContainer>
          {lists && (
            <>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"장소"}
                  content={lists.title.replace(/<(\/b|b)([^>]*)>/gi, "")}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"카테고리"}
                  content={lists.category}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent title={"주소"} content={lists.address} />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"도로명"}
                  content={lists.readAddress}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"방문 여부"}
                  content={lists.isVisit ? "O" : "X"}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"마지막 방문 일자"}
                  content={lists.lastVisitDate}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"방문횟수"}
                  content={lists.visitCount.toString()}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"홈페이지"}
                  content={lists.homePageLink}
                />
              </ImageContentContainer>
            </>
          )}
          <StyledButtonWrapper>
            <StyledImageButton
              onClick={onClickAddWishList}
              style={{ marginBottom: 20 }}
              variant="contained"
            >
              위시리스트 추가
            </StyledImageButton>
            <StyledImageButton variant="contained">
              위시리스트 삭제
            </StyledImageButton>
          </StyledButtonWrapper>
        </ImageInfoContainer>
      </ResultWrapper>
    </Wrapper>
  );
};

const ImageContentComponent: React.FC<ImageContentProps> = ({
  title,
  content,
}) => {
  return (
    <ImageContentWrapper>
      {title == "홈페이지" ? (
        <>
          {content ? (
            <a href={content as string}>홈페이지</a>
          ) : (
            <Typography>홈페이지가 존재하지 않습니다.</Typography>
          )}
        </>
      ) : (
        <>
          <Typography style={{ fontWeight: 700, marginRight: 10 }}>
            {title}:
          </Typography>
          <Typography> {content}</Typography>
        </>
      )}
    </ImageContentWrapper>
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
  width: "50%",
  display: "flex",
  justifyContent: "center",
}));

export const ImageInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const ImageContentContainer = styled("div")(({ theme }) => ({
  minWidth: "300px",
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
