import CommentAdd from "@/components/CommentAdd";
import CommentsList from "@/components/CommentsList";
import { IPost } from "@/types/posts";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useEffect, useRef } from "react";
import { useGetPostCommentsQuery } from "../features/api/apiSlice";

type Props = {
  post: IPost;
  commentsDialog: any;
  setCommentsDialog: any;
};

const CommentsDialog = ({ post, commentsDialog, setCommentsDialog }: Props) => {
  const handleClose = () => setCommentsDialog(false);

  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  const { data: postCommentsData } = useGetPostCommentsQuery(post.id);
  if (commentsDialog === true) {
    console.log(postCommentsData, "comments");
  }

  return (
    <Dialog
      open={commentsDialog}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Comments</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {post.comments.length > 0 ? (
          <CommentsList post={post} />
        ) : (
          "Be the first to comment!"
        )}
      </DialogContent>

      <DialogActions>
        <CommentAdd post={post} handleClose={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default CommentsDialog;
