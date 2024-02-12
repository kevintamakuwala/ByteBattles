import React, { useState,useContext } from "react";
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
import { successNotification, errorNotification } from "../../utils";
import { ToastContainer } from "react-toastify";
import Dashboard from "../lists/Dashboard";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../context/AdminContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        ByteBattles
      </Link>
    </Typography>
  );
}

const Signin = ({ onLogin,onLogout }) => {
  const { setLoginState } = useContext(AdminContext);
  // const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const credentials = await response.json();
        if (credentials.jwt !== "") {
          onLogin();
          localStorage.setItem("jwt", credentials.jwt);
        } else {
          onLogout();
          errorNotification("Invalid Credentials");
        }
      } else {
        errorNotification("Invalid Credentials");
      }
    } catch (error) {
      errorNotification("Invalid Credentials");
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <ToastContainer />
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
            <Avatar sx={{ m: 1, bgcolor: "#1F2A40" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Signin
            </Typography>
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
                label="username"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                label="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(e) => handleSubmit(e)}
                sx={{ mt: 3, mb: 2 }}
              >
                Signin
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </form>
    </>
  );
};
export default Signin;
