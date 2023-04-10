import { IPost } from "@/types/posts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
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
    // <FormGroup>
    //   <FormControlLabel
    //     label={"Private"}
    //     control={
    //       <Switch
    //         checked={post.public ? false : true}
    //         onChange={handleChange}
    //         inputProps={{ "aria-label": "controlled" }}
    //       />
    //     }
    //   ></FormControlLabel>
    // </FormGroup>
    <Tooltip
      title={post.public ? "Make post private" : "Make post public"}
      placement="top"
    >
      <IconButton
        color="primary"
        aria-label="toggle public/private"
        component="label"
        onClick={() => {
          handleChange();
        }}
      >
        {post.public ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default TogglePrivateSwitch;
