import PaginationCard from "@/components/PaginationCard";
import PostCard from "@/components/PostCard";
import PublicPostsTopCard from "@/components/PublicPostsTopCard";
import {
  useGetFollowingPostsQuery,
  useGetPublicPostsQuery,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import { CircularProgress, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
type Props = {};

const Homepage = ({}: Props) => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber ? router.query.pageNumber : "1";

  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

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

  const count = !isLoadingPublic ? Math.ceil(publicPostsData!.count / 9) : 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    router.push(`/?pageNumber=${page}`);
  };
  return (
    <>
      {token.length > 0 ? (
        <PublicPostsTopCard
          subscriptionsOnly={subscriptionsOnly}
          setSubscriptionsOnly={setSubscriptionsOnly}
        />
      ) : null}
      {!subscriptionsOnly ? (
        <PaginationCard
          subscriptionsOnly={subscriptionsOnly}
          pageNumber={parseInt(pageNumber as string)}
          count={count}
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
        <PaginationCard
          subscriptionsOnly={subscriptionsOnly}
          pageNumber={parseInt(pageNumber as string)}
          count={count}
        />
      ) : null}
    </>
  );
};

export default Homepage;
