import PostCard from "@/components/PostCard";
import { IPost } from "@/types/posts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Homepage = (props: Props) => {
  const testPost: IPost = {
    id: 3,
    author: "hprit",
    image_url: "/images/images/EPW005004.jpg",
    comments: [5],
    likes: [1],
    liked_by: ["bprit"],
    caption: "a really old photo",
    created_on: "2023-03-23T22:45:44.344277Z",
    public: true,
    user: 2,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <PostCard post={testPost} />
      </Grid>
    </Box>
  );
};

export default Homepage;
