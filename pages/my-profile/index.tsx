import PrivateUserCard from "@/components/PrivateUserCard";
import { useGetCurrentUserInfoQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const MyProfile = (props: Props) => {
  const { data: userInfoData, isLoading } = useGetCurrentUserInfoQuery();
  const auth = useSelector((state: RootState) => state.auth);

  if (userInfoData != undefined && auth.token.length > 0) {
    return <PrivateUserCard userInfoData={userInfoData!} />;
  }
  console.log(userInfoData);
};

export default MyProfile;
