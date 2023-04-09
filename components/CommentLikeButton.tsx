import { RootState } from "@/store/store";
import { IComment } from "@/types/comments";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLikeCommentMutation } from "../features/api/apiSlice";

type Props = { comment: IComment };

const CommentLikeButton = ({ comment }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

  const [likeComment, { isLoading }] = useLikeCommentMutation();

  const liked_by =
    comment.liked_by.length > 0
      ? `Liked by ${comment.liked_by.join(", ").toString()}`
      : "No likes yet";

  const handleLikeClick = () => {
    likeComment(comment.id);
    console.log(comment);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={liked_by} placement="bottom">
        {token.length > 0 ? (
          <Chip
            icon={
              comment.likes.includes(auth.id) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            label={comment.likes.length}
            variant="outlined"
            onClick={() => {
              handleLikeClick();
            }}
          />
        ) : (
          <Chip
            icon={<FavoriteBorderIcon />}
            label={comment.likes.length}
            variant="outlined"
          />
        )}
      </Tooltip>
    </Stack>
  );
};

export default CommentLikeButton;
