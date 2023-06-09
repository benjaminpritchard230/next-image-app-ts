import MyDropzone from "@/components/MyDropzone";
import { openClose } from "@/features/dialog/newPostDialogSlice";
import { RootState } from "@/store/store";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useNewPostMutation } from "../features/api/apiSlice";

type Props = {};

const NewPostDialog = (props: Props) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.newPostDialog.isOpen);
  const [newPost, { isLoading }] = useNewPostMutation();

  const handleClose = () => {
    dispatch(openClose());
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data, "data");
    data.append("public", "true");

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

            <MyDropzone
              inputProps={{
                id: "image_url",
                label: "image",
                name: "image_url",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Create post</Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}

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
