import { IPost } from "@/types/posts";
import { FormControlLabel, FormGroup } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useMakePrivateMutation } from "../features/api/apiSlice";

type Props = { post: IPost };

const TogglePrivateSwitch = ({ post }: Props) => {
  const [makePrivate, { isLoading }] = useMakePrivateMutation();

  const handleChange = async () => {
    try {
      await makePrivate(post).unwrap();
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
