import { IPost } from "@/types/posts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useDeleteMutation } from "../features/api/apiSlice";

type Props = {
  post: IPost;
};

const DeletePostButton = ({ post }: Props) => {
  const [deletePost] = useDeleteMutation();

  const handleDeleteClick = async () => {
    try {
      await deletePost(post.id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Tooltip title="Delete" placement="top">
      <IconButton
        color="primary"
        aria-label="delete post"
        component="label"
        onClick={() => {
          handleDeleteClick();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeletePostButton;
