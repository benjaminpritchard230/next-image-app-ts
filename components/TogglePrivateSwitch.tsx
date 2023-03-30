import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import { FormControlLabel, FormGroup, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMakePrivateMutation } from "../features/api/apiSlice";

type Props = { post: IPost };

const TogglePrivateSwitch = ({ post }: Props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  const [makePrivate, { isLoading }] = useMakePrivateMutation();

  const handleChange = async () => {
    try {
      await makePrivate(post).unwrap();
      console.log(post.public);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        label={"Private"}
        control={
          <Switch
            checked={post.public ? false : true}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      ></FormControlLabel>
    </FormGroup>
  );
};

export default TogglePrivateSwitch;
