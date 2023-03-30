import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useEditUserProfileMutation } from "../features/api/apiSlice";

import MyDropzone from "./MyDropzone";

type Props = {
  editUserAvatarDialog: boolean;
  setEditUserAvatarDialog: Dispatch<SetStateAction<boolean>>;
};

const EditUserAvatarDialog = ({
  editUserAvatarDialog,
  setEditUserAvatarDialog,
}: Props) => {
  const dispatch = useDispatch();

  const [editUserProfile] = useEditUserProfileMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setEditUserAvatarDialog(false);
    const data = new FormData(e.target);
    console.log(data, "data");
    try {
      await editUserProfile(data).unwrap();
    } catch (err) {
      console.log(err, "err");
    }
  };
  const handleClose = () => {
    setEditUserAvatarDialog(false);
  };
  return (
    <>
      <Dialog
        open={editUserAvatarDialog}
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
          <DialogTitle>Change your user avatar</DialogTitle>
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
            <MyDropzone
              inputProps={{
                id: "profile_image",
                label: "image",
                name: "profile_image",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Edit profile</Button>
            <Button
              onClick={() => {
                setEditUserAvatarDialog(false);
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

export default EditUserAvatarDialog;
