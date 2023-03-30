import { RootState } from "@/store/store";
import { IPost } from "@/types/posts";
import { FormControlLabel, FormGroup } from "@mui/material";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMakePrivateMutation } from "../features/api/apiSlice";

type Props = { post: IPost };

const TogglePrivateSwitch = ({ post }: Props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  const [checked, setChecked] = useState(post.public === true ? false : true);
  const [makePrivate, { isLoading }] = useMakePrivateMutation();

  const handleChange = async () => {
    // setChecked(!checked);
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
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      ></FormControlLabel>
    </FormGroup>
  );
};

export default TogglePrivateSwitch;
