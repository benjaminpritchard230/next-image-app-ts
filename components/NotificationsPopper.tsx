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
import * as React from "react";
import { useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "../features/api/apiSlice";
import NotificationDisplay from "./NotificationDisplay";

type Props = {
  handleOpenNotificationsMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNotificationsMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNotifications: HTMLElement | null;
  setAnchorElNotifications: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
};

const NotificationsPopper = ({
  handleOpenNotificationsMenu,
  handleCloseNotificationsMenu,
  anchorElNotifications,
  setAnchorElNotifications,
}: Props) => {
  const open = Boolean(anchorElNotifications);
  const id = open ? "notifications-popper" : undefined;

  const {
    data: notificationsData,
    error,
    isError,
    isLoading,
  } = useGetNotificationsQuery();

  const [markRead] = useMarkNotificationReadMutation();

  useEffect(() => {
    console.log(notificationsData, "notificationsdata");
  }, [notificationsData]);

  const unreadNotifications = notificationsData
    ? notificationsData.filter((obj) => obj.unread === true)
    : 0;

  const displayNotifications = () => {
    if (notificationsData) {
      let unreadNotifications = notificationsData.filter(
        (obj) => obj.unread === true
      );
      return unreadNotifications.map((notification) => (
        <NotificationDisplay
          notification={notification}
          key={notification.id}
        />
      ));
    } else {
      return "No notifications yet.";
    }
  };

  return (
    <div>
      <Popover
        id={id}
        open={open}
        onClose={handleCloseNotificationsMenu}
        anchorEl={anchorElNotifications}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ border: 0, p: 1, bgcolor: "background.paper" }}>
          <List
            sx={{
              width: "100%",
              maxHeight: "500px",
              bgcolor: "background.paper",
            }}
          >
            {displayNotifications().length > 0
              ? displayNotifications()
              : "No notifications yet."}
          </List>
        </Box>
      </Popover>
    </div>
  );
};

export default NotificationsPopper;
