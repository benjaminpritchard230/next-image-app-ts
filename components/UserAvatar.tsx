import { useGetCurrentUserInfoQuery } from "@/features/api/apiSlice";
import { Avatar } from "@mui/material";
import React from "react";

type Props = {};

const UserAvatar = (props: Props) => {
  const { data: currentUserInfoData } = useGetCurrentUserInfoQuery();

  return (
    <Avatar
      src={
        currentUserInfoData != undefined
          ? `https://escooter230.pythonanywhere.com${currentUserInfoData.profile_image}`
          : ""
      }
      alt="user-avatar"
    />
  );
};

export default UserAvatar;
