import PostCard from "@/components/PostCard";
import { IPost, IPostsResponse } from "@/types/posts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { GetStaticProps } from "next";
import React from "react";
type Props = {
  data: IPostsResponse;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Homepage = ({ data }: Props) => {
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
      <Grid container spacing={0}>
        {data.results.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Grid>
    </Box>
  );
};

export default Homepage;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `https://escooter230.pythonanywhere.com/posts/all?page=1`
  );
  const data: IPostsResponse = await res.json();
  console.log(data, "data");
  return {
    props: {
      data,
    },
  };
};
