import PostCard from "@/components/PostCard";
import PublicPostsTopCard from "@/components/PublicPostsTopCard";
import {
  useGetCurrentUserInfoQuery,
  useGetFollowingPostsQuery,
  useGetPublicPostsQuery,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IPost, IPostsResponse } from "@/types/posts";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
type Props = {};

const Homepage = ({}: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [subscriptionsOnly, setSubscriptionsOnly] = useState(false);

  const {
    data: publicPostsData,
    error,
    isError,
    isLoading: isLoadingPublic,
  } = useGetPublicPostsQuery("1", { refetchOnMountOrArgChange: true });

  const { data: subscribedPostsData, isLoading: isLoadingSubscribed } =
    useGetFollowingPostsQuery();

  const displayAllImagePosts = () => {
    if (!isLoadingPublic && publicPostsData != undefined) {
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
  const displaySubscribedImagePosts = () => {
    if (!isLoadingSubscribed && subscribedPostsData != undefined) {
      return subscribedPostsData!.map((post: IPost) => (
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
    <>
      {auth.token.length > 0 ? (
        <PublicPostsTopCard
          subscriptionsOnly={subscriptionsOnly}
          setSubscriptionsOnly={setSubscriptionsOnly}
        />
      ) : null}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          {subscriptionsOnly
            ? displaySubscribedImagePosts()
            : displayAllImagePosts()}
        </Grid>
      </Box>
    </>
  );
};

export default Homepage;
