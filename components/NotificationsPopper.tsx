import { Popover } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import * as React from "react";
import { useGetNotificationsQuery } from "../features/api/apiSlice";
import NotificationDisplay from "./NotificationDisplay";

type Props = {
  handleCloseNotificationsMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNotifications: HTMLElement | null;
};

const NotificationsPopper = ({
  handleCloseNotificationsMenu,
  anchorElNotifications,
}: Props) => {
  const open = Boolean(anchorElNotifications);
  const id = open ? "notifications-popper" : undefined;

  const {
    data: notificationsData,
    error,
    isError,
    isLoading,
  } = useGetNotificationsQuery();

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
