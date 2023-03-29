import MyDropzone from "@/components/MyDropzone";
import { openClose } from "@/features/dialog/newPostDialogSlice";
import { RootState } from "@/store/store";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNewPostMutation } from "../features/api/apiSlice";

type Props = {};

const NewPostDialog = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.newPostDialog.isOpen);

  const [image, setImage] = useState();
  const [newPost, { isLoading }] = useNewPostMutation();

  const handleClose = () => {
    dispatch(openClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data, "data");
    try {
      await newPost(data).unwrap();
    } catch (err) {
      console.log(err, "err");
    }
    handleClose();
  };
  return (
    <>
      <Dialog
        open={isOpen}
        PaperProps={{
          sx: {
            width: {
              lg: "100vw",
              xl: "33vw",
            },
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create a new post</DialogTitle>
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
            {" "}
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              name="caption"
              autoFocus
              margin="dense"
              id="caption"
              label="Caption"
              type="text"
              fullWidth
              variant="standard"
            />

            <MyDropzone />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Create post</Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default NewPostDialog;
