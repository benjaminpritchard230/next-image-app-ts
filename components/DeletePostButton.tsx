import { IPost } from "@/types/posts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
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
      <Chip
        icon={<DeleteIcon />}
        variant="outlined"
        label="Delete"
        onClick={() => {
          handleDeleteClick();
        }}
      />
    </Tooltip>
  );
};

export default DeletePostButton;
