import PostCard from "@/components/PostCard";
import {
  useGetCurrentUserInfoQuery,
  useGetPublicPostsQuery,
} from "@/features/api/apiSlice";
import { IPost, IPostsResponse } from "@/types/posts";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { GetStaticProps } from "next";
import React from "react";
type Props = {};

const Homepage = ({}: Props) => {
  const {
    data: publicPostsData,
    error,
    isError,
    isLoading,
  } = useGetPublicPostsQuery("1", { refetchOnMountOrArgChange: true });

  const displayImagePosts = () => {
    if (!isLoading && publicPostsData != undefined) {
      return publicPostsData!.results.map((post: IPost) => (
        <PostCard post={post} key={post.id} />
      ));
    } else {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };
  const { data: currentUserInfoData } = useGetCurrentUserInfoQuery();
  console.log(currentUserInfoData);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {displayImagePosts()}
      </Grid>
    </Box>
  );
};

export default Homepage;
