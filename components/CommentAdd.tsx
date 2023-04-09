import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import { Button, Card, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddCommentMutation } from "../features/api/apiSlice";
import UserAvatar from "./UserAvatar";

type Props = {
  post: IPost;
  handleClose: any;
};

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

const CommentAdd = ({ post, handleClose }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [addComment, { isLoading }] = useAddCommentMutation();

  const [formState, setFormState] = useState({ body: "" });

  const handleChange = ({ target: { name, value } }: ITarget) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const id = post.id;

  const handleAddCommentClick = async () => {
    if (auth.token.length > 0) {
      try {
        await addComment({ id: id, body: formState }).unwrap();

        setFormState({ body: "" });
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
      }}
      elevation={1}
    >
      <Box sx={{ p: "15px" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <UserAvatar />
          <TextField
            multiline
            fullWidth
            minRows={4}
            id="body"
            name="body"
            label="Enter comment..."
            type="text"
            value={formState.body}
            onChange={handleChange}
          />
          <Button
            size="large"
            // sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              if (formState.body.length > 0) {
                handleAddCommentClick();
              }
            }}
          >
            Post
          </Button>
          <Button
            size="large"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default CommentAdd;
