import { IPost } from "@/types/posts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { useDeleteMutation } from "../features/api/apiSlice";

type Props = {
  post: IPost;
};

const DeletePostButton = ({ post }: Props) => {
  const dispatch = useDispatch();
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
