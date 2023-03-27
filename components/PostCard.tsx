import { IPost } from "@/types/posts";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

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
  return (
    <Grid xs={12} md={6} lg={4}>
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ minHeight: 150 }}>
          <CardMedia
            style={{ height: "300px", width: "auto" }}
            component="img"
            image={`https://escooter230.pythonanywhere.com/${post.image_url}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.caption}
            </Typography>
          </CardContent>
        </Card>
      </Item>
    </Grid>
  );
};

export default PostCard;
