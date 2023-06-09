import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useState } from "react";
import { useEditUserProfileMutation } from "../features/api/apiSlice";

type Props = {
  editUserProfileDialog: boolean;
  setEditUserProfileDialog: Dispatch<SetStateAction<boolean>>;
};

const EditUserProfileDialog = ({
  editUserProfileDialog,
  setEditUserProfileDialog,
}: Props) => {
  const [location, setLocation] = useState("");

  const [aboutMe, setAboutMe] = useState("");

  const [editUserProfile] = useEditUserProfileMutation();

  const handleEditClick = async () => {
    setEditUserProfileDialog(false);
    const data = new FormData();
    if (location.length > 0) {
      data.append("location", location);
    }
    if (aboutMe.length > 0) {
      data.append("about_me", aboutMe);
    }
    try {
      await editUserProfile(data).unwrap();
    } catch (err) {
      console.log(err, "err");
    }
    setLocation("");
    setAboutMe("");
  };
  const handleClose = () => {
    setEditUserProfileDialog(false);
    setLocation("");
    setAboutMe("");
  };
  return (
    <>
      <Dialog
        open={editUserProfileDialog}
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
        <DialogTitle>Edit your user profile</DialogTitle>
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
            name="location"
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <TextField
            name="about_me"
            autoFocus
            margin="dense"
            id="about_me"
            label="About me"
            type="text"
            fullWidth
            variant="standard"
            value={aboutMe}
            onChange={(e) => {
              setAboutMe(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditClick()}>Edit profile</Button>
          <Button
            onClick={() => {
              setEditUserProfileDialog(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserProfileDialog;
