import { IComment } from "@/types/comments";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useDeleteCommentMutation } from "../features/api/apiSlice";

type Props = {
  comment: IComment;
};

const DeleteCommentButton = ({ comment }: Props) => {
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
