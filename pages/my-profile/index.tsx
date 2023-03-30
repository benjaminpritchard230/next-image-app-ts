import PostCard from "@/components/PostCard";
import PrivateUserCard from "@/components/PrivateUserCard";
import {
  useGetCurrentUserInfoQuery,
  useGetPrivatePostsQuery,
  useGetPublicPostsQuery,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const MyProfile = (props: Props) => {
  const { data: userInfoData } = useGetCurrentUserInfoQuery();
  const {
    data: privatePostsData,
    error,
    isError,
    isLoading,
  } = useGetPrivatePostsQuery();
  console.log(privatePostsData);
  const auth = useSelector((state: RootState) => state.auth);
  const displayUserInfoCard = () => {
    if (userInfoData != undefined && auth.token.length > 0) {
      return <PrivateUserCard userInfoData={userInfoData!} />;
    }
  };
  const displayImagePosts = () => {
    if (privatePostsData != undefined && auth.token.length > 0) {
      return privatePostsData!.map((post) => (
        <PostCard post={post} key={post.id} />
      ));
    }
  };

  return (
    <>
      {displayUserInfoCard()}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          {displayImagePosts()}
        </Grid>
      </Box>
    </>
  );
};

export default MyProfile;
