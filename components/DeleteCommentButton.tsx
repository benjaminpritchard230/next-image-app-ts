import { IComment } from "@/types/comments";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import {
  useDeleteCommentMutation,
  useDeleteMutation,
} from "../features/api/apiSlice";

type Props = {
  comment: IComment;
};

const DeleteCommentButton = ({ comment }: Props) => {
  const dispatch = useDispatch();
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteClick = async () => {
    try {
      await deleteComment(comment.id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Tooltip title="Delete" placement="bottom">
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

export default DeleteCommentButton;
