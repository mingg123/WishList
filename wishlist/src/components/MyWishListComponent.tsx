import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { WishListDO } from "../data/WishListDO";
import { getAllList } from "../modules/wishList";
import {
  ImageResultComponent,
  ImageResultComponentProps,
} from "./ImageResultComponent";
import {
  AllResultWrapper,
  DownIconWrapper,
  MyWishListContent,
  ResultTitle,
  StyledDownIcon,
  TitleWrapper,
} from "./main";

type IMYWishListComponentProps = Pick<ImageResultComponentProps, "allList">;
export const MYWishListComponent: React.FC<IMYWishListComponentProps> = ({
  allList,
}) => {
  const dispatch = useDispatch();
  const onClickAllWishList = useCallback(
    async (e) => {
      dispatch(getAllList());
    },
    [dispatch]
  );

  return (
    <>
      <TitleWrapper>
        <ResultTitle>나의 맛집 리스트</ResultTitle>
      </TitleWrapper>
      <MyWishListContent>
        <DownIconWrapper>
          <StyledDownIcon onClick={onClickAllWishList} />
        </DownIconWrapper>
        <AllResultWrapper>
          {allList &&
            allList.map((list: WishListDO, idx: number) => (
              <ImageResultComponent
                list={list}
                allList={allList}
                loadingList={false}
                key={list.index}
                showAll={true}
              />
            ))}
        </AllResultWrapper>
      </MyWishListContent>
    </>
  );
};
