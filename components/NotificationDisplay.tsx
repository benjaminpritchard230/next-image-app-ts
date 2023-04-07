import { INotification } from "@/types/notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { Popover, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import * as React from "react";
import { useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "../features/api/apiSlice";

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
                {/* {notification.unread ? "true" : "false"} */}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider component="li" /> */}
    </>
  );
};

export default NotificationDisplay;
