import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { WishListDO } from "../data/WishListDO";
import {
  addVisit,
  addWishList,
  deleteList,
  getAllList,
} from "../modules/wishList";
import { ImageContentComponent } from "./ImageContentComponent";
import {
  ImageContentContainer,
  ImageInfoContainer,
  ImageWrapper,
  IMainProps,
  ResultWrapper,
  StyledButtonWrapper,
  StyledImageButton,
} from "./main";

export type ImageResultComponentProps = Omit<IMainProps, "input"> & {
  showAll: boolean;
};
export const ImageResultComponent: React.FC<ImageResultComponentProps> = ({
  list,
  allList,
  loadingList,
  showAll,
}) => {
  const dispatch = useDispatch();
  const onClickAddWishList = useCallback(
    async (e) => {
      if (allList && list) {
        const duplicatePlace = allList.some((lists) => {
          return lists.address == list.address;
        });
        if (duplicatePlace) {
          alert("이미 위시리스트에 추가되어 있습니다.");
          return;
        }
      }
      if (list) dispatch(addWishList(list));
    },
    [list, allList, dispatch]
  );

  const onClickDeleteWish = useCallback(
    (idx: number) => {
      dispatch(deleteList(idx));
    },
    [dispatch]
  );

  const onClickAddVisit = useCallback(
    (idx: number) => {
      console.log("add visit");
      dispatch(addVisit(idx));
      dispatch(getAllList());
    },
    [dispatch, list]
  );

  return (
    <>
      <ResultWrapper>
        <ImageWrapper>
          {list && !loadingList && (
            <img
              src={list.imageLink}
              style={{ maxHeight: "500px", maxWidth: "500px" }}
            />
          )}
        </ImageWrapper>
        <ImageInfoContainer>
          {list && (
            <>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"장소"}
                  content={
                    list.title
                      ? list.title.replace(/<(\/b|b)([^>]*)>/gi, "")
                      : ""
                  }
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"카테고리"}
                  content={list.category}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent title={"주소"} content={list.address} />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"도로명"}
                  content={list.readAddress}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"방문 여부"}
                  content={list.visit == true ? "O" : "X"}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"마지막 방문 일자"}
                  content={list.lastVisitDate}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"방문횟수"}
                  content={list.visitCount.toString()}
                />
              </ImageContentContainer>
              <ImageContentContainer>
                <ImageContentComponent
                  title={"홈페이지"}
                  content={list.homePageLink}
                />
              </ImageContentContainer>
              <StyledButtonWrapper>
                {showAll == true ? (
                  <StyledImageButton
                    onClick={(e) => {
                      onClickAddVisit(list.index);
                    }}
                    style={{ marginBottom: 20 }}
                    variant="contained"
                  >
                    방문 추가
                  </StyledImageButton>
                ) : (
                  <StyledImageButton
                    onClick={onClickAddWishList}
                    style={{ marginBottom: 20 }}
                    variant="contained"
                  >
                    위시리스트 추가
                  </StyledImageButton>
                )}

                <StyledImageButton
                  onClick={(e) => {
                    onClickDeleteWish(list.index);
                  }}
                  variant="contained"
                >
                  위시리스트 삭제
                </StyledImageButton>
              </StyledButtonWrapper>
            </>
          )}
        </ImageInfoContainer>
      </ResultWrapper>
    </>
  );
};
