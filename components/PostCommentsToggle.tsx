import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLikeMutation } from "../features/api/apiSlice";

type Props = {
  post: IPost;
  token: string;
  commentsDialog: boolean;
  setCommentsDialog: any;
  username: string;
};

const PostCommentsToggle = ({
  post,
  username,
  token,
  commentsDialog,
  setCommentsDialog,
}: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [like, { isLoading }] = useLikeMutation();

  const handleClick = () => {
    setCommentsDialog(!commentsDialog);
  };
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<ModeCommentOutlinedIcon color="info" />}
        label={post.comments.length}
        variant="outlined"
        onClick={() => {
          handleClick();
        }}
      />
    </Stack>
  );
};

export default PostCommentsToggle;
