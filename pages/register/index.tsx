import { useRegisterMutation } from "@/features/api/apiSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

type Props = {};

const RegisterPage = (props: Props) => {
  const router = useRouter();

  const [register, { isLoading, error }] = useRegisterMutation();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }: ITarget) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

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

  const handleRegisterClick = async () => {
    try {
      const user = await register(formState).unwrap();
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
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
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            onClick={() => {
              handleRegisterClick();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error ? (
            <List>
              <ListItem>
                <ListItemText>Error: {displayError()}</ListItemText>
              </ListItem>
            </List>
          ) : null}
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

export default RegisterPage;
