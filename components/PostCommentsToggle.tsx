import { IPost } from "@/types/posts";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

type Props = {
  post: IPost;
  commentsDialog: boolean;
  setCommentsDialog: any;
};

const PostCommentsToggle = ({
  post,
  commentsDialog,
  setCommentsDialog,
}: Props) => {
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
