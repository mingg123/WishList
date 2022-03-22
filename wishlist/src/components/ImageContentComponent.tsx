import { Typography } from "@mui/material";
import { ImageContentWrapper } from "./main";

export interface IImageContentComponentProps {
  title: string;
  content?: string;
}
export const ImageContentComponent: React.FC<IImageContentComponentProps> = ({
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
