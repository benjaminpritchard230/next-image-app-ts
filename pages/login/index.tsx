import { useLoginMutation } from "@/features/api/apiSlice";
import { setCredentials, setRemember } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

const LoginPage = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  const [login, { isLoading, error }] = useLoginMutation();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }: ITarget) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleLoginClick = async () => {
    try {
      const user = await login(formState).unwrap();
      dispatch(setCredentials(user));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const extractErrorMessage = (str: string) => {
    const matches = str.match(/\[(.*?)\]/);
    if (matches) {
      return matches[1];
    } else {
      return null;
    }
  };

  const displayError = () => {
    if (error && "data" in error) {
      return <div>{extractErrorMessage(JSON.stringify(error.data))}</div>;
    }
  };

  const handleRememberChange = () => {
    dispatch(setRemember());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleRememberChange}
                checked={auth.remember}
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleLoginClick();
            }}
          >
            Sign In
          </Button>
          {error ? (
            <List>
              <ListItem>
                <ListItemText>Error: {displayError()}</ListItemText>
              </ListItem>
            </List>
          ) : null}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item></Grid>
          </Grid>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
