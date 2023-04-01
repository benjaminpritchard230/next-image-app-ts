import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import CommentsDialog from "./CommentsDialog";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";
import PostCommentsToggle from "./PostCommentsToggle";
import TogglePrivateSwitch from "./TogglePrivateSwitch";

type Props = {
  post: IPost;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PostCard = ({ post }: Props) => {
  TimeAgo.addLocale(en);
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const [commentsDialog, setCommentsDialog] = useState(false);

  return (
    <Grid xs={12} md={6} lg={4}>
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ minHeight: 150 }}>
          <CardMedia
            style={{ height: "300px", width: "auto" }}
            component="img"
            image={`https://escooter230.pythonanywhere.com/${post.image_url}`}
            alt={post.caption}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              &quot;{capitalizeString(post.caption)}&quot; posted by{" "}
              <Link href={`/user/${post.user}`}>
                {capitalizeString(post.author)}
              </Link>{" "}
              <ReactTimeAgo date={Date.parse(post.created_on)} />
            </Typography>
          </CardContent>
          <CardActions>
            <LikeButton post={post} />
            <PostCommentsToggle
              post={post}
              token={token}
              username={auth.username}
              commentsDialog={commentsDialog}
              setCommentsDialog={setCommentsDialog}
            />
            {post.user === auth.id ? <TogglePrivateSwitch post={post} /> : null}
            {post.user === auth.id ? <DeletePostButton post={post} /> : null}
          </CardActions>
        </Card>
      </Item>
      <CommentsDialog
        key={post.id}
        post={post}
        commentsDialog={commentsDialog}
        setCommentsDialog={setCommentsDialog}
      />
    </Grid>
  );
};

export default PostCard;
