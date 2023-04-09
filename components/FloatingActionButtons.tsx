import { openClose } from "@/features/dialog/newPostDialogSlice";
import { RootState } from "@/store/store";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  setNewPostDialog?: any;
};

const FloatingActionButtons = ({ setNewPostDialog }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

  const handleNewPostClick = () => {
    if (token.length > 0) {
      dispatch(openClose());
    } else {
      router.push("/login");
    }
  };

  return (
    <Box
      sx={{
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
    >
      <Tooltip title="New post">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            handleNewPostClick();
          }}
        >
          <PostAddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FloatingActionButtons;
