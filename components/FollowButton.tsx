import {
  useFollowUserMutation,
  useGetCurrentUserInfoQuery,
} from "@/features/api/apiSlice";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
  id: string;
};

const FollowButton = ({ id }: Props) => {
  const {
    data: currentUserInfoData,
    error,
    isError,
    isLoading,
  } = useGetCurrentUserInfoQuery();

  const [followUser] = useFollowUserMutation();

  const handleSubscribeClick = () => {
    followUser(id);
  };

  if (currentUserInfoData != undefined) {
    return (
      <Tooltip
        title={
          !isLoading && currentUserInfoData.following.includes(parseInt(id))
            ? "Click to unsubscribe"
            : "Click to subscribe"
        }
        placement={"right"}
      >
        <Button
          variant={
            !isLoading && currentUserInfoData.following.includes(parseInt(id))
              ? "outlined"
              : "contained"
          }
          onClick={() => {
            handleSubscribeClick();
          }}
        >
          {!isLoading && currentUserInfoData.following.includes(parseInt(id))
            ? "Unfollow"
            : "Follow"}
        </Button>
      </Tooltip>
    );
  } else return <></>;
};

export default FollowButton;
