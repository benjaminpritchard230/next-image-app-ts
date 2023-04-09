import { useGetUserInfoQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IComment } from "@/types/comments";
import { Avatar, Chip, Grid, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import CommentLikeButton from "./CommentLikeButton";
import DeleteCommentButton from "./DeleteCommentButton";

type Props = {
  comment: IComment;
};

const CommentDisplay = ({ comment }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const id = auth.id;

  const {
    data: userInfoData,
    error,
    isError,
    isLoading,
  } = useGetUserInfoQuery(`${comment.user}`);

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Paper elevation={0} style={{ padding: "10px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar
            alt={userInfoData?.username}
            src={`https://escooter230.pythonanywhere.com/${userInfoData?.profile_image}`}
          />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Stack direction="row" spacing={1}>
            <Link href={`/user/${comment.user}/`} variant="body1">
              {capitalizeString(comment.author)}
            </Link>{" "}
            {comment.user === auth.id ? (
              <Chip label="You" variant="outlined" />
            ) : null}
          </Stack>
          <p style={{ textAlign: "left" }}>{comment.body} </p>
          <p style={{ textAlign: "left", color: "gray" }}>
            <ReactTimeAgo date={Date.parse(comment.created_on)} />
          </p>
          <Stack direction="row" spacing={1}>
            <CommentLikeButton comment={comment} key={comment.id} />
            {comment.user === id ? (
              <DeleteCommentButton comment={comment} />
            ) : null}
          </Stack>
        </Grid>
      </Grid>
      {/* <Divider variant="fullWidth" style={{ margin: "10px 0" }} /> */}
    </Paper>
  );
};

export default CommentDisplay;
