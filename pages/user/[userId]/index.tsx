import FollowButton from "@/components/FollowButton";
import PostCard from "@/components/PostCard";
import {
  useGetUserInfoQuery,
  useGetUserPostsQuery,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { Avatar, Box, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";

type Props = {};

const UserDetail = (props: Props) => {
  TimeAgo.addLocale(en);
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

  const router = useRouter();
  const userId = router.query.userId;

  const {
    data: userInfoData,
    error,
    isError,
    isLoading,
  } = useGetUserInfoQuery(userId as string);

  const { data: userPostData } = useGetUserPostsQuery(userId as string);

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (userId != undefined && (userId as string) === auth.id.toString()) {
      router.push("/my-profile");
    }
  }, [auth.id, router, userId]);

  const displayImagePosts = () => {
    if (userPostData != undefined) {
      return userPostData!.map((post) => (
        <PostCard post={post} key={post.id} />
      ));
    }
  };

  if (userInfoData != undefined) {
    return (
      <>
        <Card
          sx={{
            width: "100%",
          }}
        >
          <CardContent>
            {!isLoading ? (
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Avatar
                  src={`https://escooter230.pythonanywhere.com/${userInfoData.profile_image}`}
                  alt="user-avatar"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h4" component="div">
                  {capitalizeString(userInfoData.username)}
                </Typography>
                {token.length > 0 ? (
                  <>
                    <FollowButton id={userId as string} />
                  </>
                ) : null}
              </Stack>
            ) : null}

            {!isLoading ? (
              <Stack
                direction={{ xs: "column", xl: "row" }}
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 1, xl: 3 }}
                divider={<Divider orientation="vertical" flexItem />}
                mt={2}
              >
                <Typography variant="h5" component="div">
                  {userInfoData.location
                    ? capitalizeString(userInfoData.location)
                    : null}
                </Typography>
                <Typography variant="h5" component="div">
                  Joined{" "}
                  {<ReactTimeAgo date={Date.parse(userInfoData.date_joined)} />}
                </Typography>

                {userInfoData != undefined &&
                userInfoData.about_me != null &&
                userInfoData.about_me.length > 0 ? (
                  <Typography variant="h5" component="div">
                    {capitalizeString(userInfoData.about_me!)}
                  </Typography>
                ) : null}
                <Tooltip
                  title={
                    userInfoData.followers_names.length > 0
                      ? `Followed by ${userInfoData.followers_names
                          .join(", ")
                          .toString()}`
                      : "No followers yet"
                  }
                  placement="top"
                >
                  <Typography variant="h5" component="div">
                    Followers: {userInfoData.followers.length}
                  </Typography>
                </Tooltip>
                <Tooltip
                  title={
                    userInfoData!.following_names.length > 0
                      ? `Following ${userInfoData.following_names
                          .join(", ")
                          .toString()}`
                      : "Not following anyone yet"
                  }
                  placement="top"
                >
                  <Typography variant="h5" component="div">
                    Following: {userInfoData.following.length}
                  </Typography>
                </Tooltip>
              </Stack>
            ) : null}
          </CardContent>
        </Card>
        <Typography>
          Posts by {capitalizeString(userInfoData.username)}:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            {displayImagePosts()}
          </Grid>
        </Box>
      </>
    );
  }
};

export default UserDetail;
