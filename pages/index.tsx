import PostCard from "@/components/PostCard";
import PublicPostsTopCard from "@/components/PublicPostsTopCard";
import {
  useGetCurrentUserInfoQuery,
  useGetFollowingPostsQuery,
  useGetPublicPostsQuery,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IPost, IPostsResponse } from "@/types/posts";
import { CircularProgress, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
type Props = {};

const Homepage = ({}: Props) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const pageNumber = router.query.pageNumber ? router.query.pageNumber : "1";

  const [subscriptionsOnly, setSubscriptionsOnly] = useState(false);

  const {
    data: publicPostsData,
    error,
    isError,
    isLoading: isLoadingPublic,
  } = useGetPublicPostsQuery(pageNumber as string, {
    refetchOnMountOrArgChange: true,
  });

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
  const count = !isLoadingPublic ? Math.ceil(publicPostsData!.count / 9) : 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    router.push(`/?pageNumber=${page}`);
  };
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
      {!subscriptionsOnly ? (
        <Pagination
          sx={{
            margin: 0,
            top: "auto",
            right: "46%",
            bottom: 35,
            position: "fixed",
          }}
          count={count}
          page={parseInt(pageNumber as string)}
          color="primary"
          onChange={handlePageChange}
        />
      ) : null}
    </>
  );
};

export default Homepage;
