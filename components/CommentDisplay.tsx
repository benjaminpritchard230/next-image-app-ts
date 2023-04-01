import { RootState } from "@/store/store";
import { IComment } from "@/types/comments";
import { Avatar, Chip, Divider, Grid, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import CommentLikeButton from "./CommentLikeButton";
import DeleteCommentButton from "./DeleteCommentButton";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

type Props = {
  comment: IComment;
};

const CommentDisplay = ({ comment }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const token = auth.token;
  const id = auth.id;
  console.log(comment);
  console.log(id);

  const userUrl = `user/${comment.user}/`;
  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <Paper elevation={0} style={{ padding: "15px 10px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Stack direction="row" spacing={1}>
            <Link href={`/${userUrl}`} variant="body1">
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
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </Paper>
  );
};

export default CommentDisplay;
