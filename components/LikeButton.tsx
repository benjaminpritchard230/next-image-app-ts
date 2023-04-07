import { useLikeMutation } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useSelector } from "react-redux";

type Props = {
  post: IPost;
};

const LikeButton = ({ post }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

  const [like, { isLoading }] = useLikeMutation();

  const handleLikeClick = () => {
    like(post.id);
  };

  const liked_by =
    post.liked_by.length > 0
      ? `Liked by ${post.liked_by.join(", ").toString()}`
      : "No likes yet";

  return (
    <Stack direction="row" spacing={1} padding={1}>
      <Tooltip title={liked_by} placement="top">
        {token.length > 0 ? (
          <Chip
            icon={
              post.likes.includes(auth.id) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            label={post.likes.length}
            variant="outlined"
            onClick={() => {
              handleLikeClick();
            }}
          />
        ) : (
          <Chip
            icon={<FavoriteBorderIcon />}
            label={post.likes.length}
            variant="outlined"
          />
        )}
      </Tooltip>
    </Stack>
  );
};

export default LikeButton;
