import { RootState } from "@/store/store";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetNotificationsQuery } from "../features/api/apiSlice";
import { setCredentials } from "../features/auth/authSlice";
import NotificationsPopper from "./NotificationsPopper";
import UserAvatar from "./UserAvatar";

type Props = {};

const Navbar = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  const username = auth.username;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElNotifications(
      anchorElNotifications ? null : event.currentTarget
    );
  };

  const handleCloseNotificationsMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElNotifications(null);
  };

  const handleLogoutClick = () => {
    dispatch(setCredentials({ id: "", token: "" }));
    // persistor.purge();
    // dispatch(postsApi.util.resetApiState());
    // dispatch(postsApi.util.invalidateTags(["Posts"]));

    router.push("/");
  };

  const {
    data: notificationsData,
    error,
    isError,
    isLoading,
  } = useGetNotificationsQuery();

  const notificationsCount = notificationsData
    ? notificationsData.filter((obj) => obj.unread === true).length
    : 0;

  useEffect(() => {
    if (!auth.remember) {
      dispatch(setCredentials({ id: "", token: "" }));
    }
    console.log("remount navbar");
  }, []);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              router.push("/");
            }}
          >
            <BurstModeOutlinedIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              router.push("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Image
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              disableScrollLock={true}
            >
              <MenuItem key={"ertyer "} onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    router.push("/about");
                  }}
                >
                  About
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <BurstModeOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {
              router.push("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Image
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key={"fgsdfg"}
              onClick={() => {
                handleCloseNavMenu;
                router.push("/about");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token.length > 0 ? (
              <Tooltip
                title={`You have ${notificationsCount} unread notifications.`}
              >
                <IconButton
                  sx={{ marginRight: { xs: "3px", md: "20px" } }}
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleOpenNotificationsMenu}
                >
                  <Badge badgeContent={notificationsCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : null}
            <Tooltip title={username ? `User settings for ${username}` : ""}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {token.length > 0 ? <UserAvatar /> : <Avatar />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              disableScrollLock={true}
            >
              {token.length > 0
                ? [
                    <MenuItem
                      key={"sftgvdbdfjghd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        router.push("/my-profile");
                      }}
                    >
                      <Typography textAlign="center">My profile</Typography>
                    </MenuItem>,
                    <MenuItem
                      key={"sftbdfjghd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogoutClick();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key={"dvfghvbd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        router.push("/login");
                      }}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>,
                    <MenuItem
                      key={"fgbhgfbd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        router.push("/register");
                      }}
                    >
                      <Typography textAlign="center">Register</Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {token.length > 0 ? (
        <NotificationsPopper
          handleCloseNotificationsMenu={handleCloseNotificationsMenu}
          anchorElNotifications={anchorElNotifications}
        />
      ) : null}
    </AppBar>
  );
};

export default Navbar;
