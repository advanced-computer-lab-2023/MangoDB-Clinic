import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Spinner from "../GeneralComponents/Spinner";
import theme from "../../theme";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        El7a2ny
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = theme;

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:4000/admin/login`,
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setState({
          open: true,
          Transition: SlideTransition,
        });
        setError(null);
        navigate("/admin");
      }
    } catch (error) {
      setState({
        open: true,
        Transition: SlideTransition,
      });
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleLogin();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
              <Typography component="h1" variant="h3" color="secondary.main">
                Welcome Back Admin 👋🏽
              </Typography>

              <Typography variant="p">Login To Use The Dashboard</Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Snackbar
                  open={state.open}
                  onClose={handleClose}
                  TransitionComponent={state.Transition}
                  key={state.Transition.name}
                  autoHideDuration={2000}
                >
                  <Alert severity="error" sx={{ width: "100%" }}>
                    {error}
                  </Alert>
                </Snackbar>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/admin/forgot-password"
                      color="secondary.main"
                      fontFamily={defaultTheme.typography.fontFamily}
                      fontSize={defaultTheme.typography.fontSize}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Grid item xs sx={{ pt: 3 }}>
                  <Typography>New user?</Typography>
                  <Link href="/register" sx={{ color: "#2fc4b2" }}>
                    Register here
                  </Link>
                </Grid>

                <Grid item sx={{ pt: 3 }}>
                  <Link href="/login" color="#2fc4b2">
                    Patient/Doctor Login
                  </Link>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
