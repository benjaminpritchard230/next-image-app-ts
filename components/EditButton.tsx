import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import * as React from "react";

type Props = {
  handleEditClick: () => void;
  text: string;
};

const EditButton = ({ handleEditClick, text }: Props) => {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<EditIcon />}
        label={text}
        variant="outlined"
        onClick={() => {
          handleEditClick();
        }}
      />
    </Stack>
  );
};

export default EditButton;
