import { INotification } from "@/types/notifications";
import DoneIcon from "@mui/icons-material/Done";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import * as React from "react";
import ReactTimeAgo from "react-time-ago";
import { useMarkNotificationReadMutation } from "../features/api/apiSlice";

type Props = {
  notification: INotification;
};

const NotificationDisplay = ({ notification }: Props) => {
  TimeAgo.addLocale(en);
  const [markRead] = useMarkNotificationReadMutation();

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <Tooltip title="Mark as read">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                markRead(notification.id);
              }}
            >
              <DoneIcon />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemText
          primary={notification.verb}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <ReactTimeAgo
                  date={Date.parse(notification.timestamp)}
                  locale="en-US"
                />
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

export default NotificationDisplay;
