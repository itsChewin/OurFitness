import { Box, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Axios from "../../../AxiosInstance";
import { AxiosError } from "axios";

const LoginForm = ({
  handleClose = () => {},
  setIsLogin = () => {},
  setStatus = () => {},
  setUser = () => {},
}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!usernameOrEmail) {
      setUsernameOrEmailError("Username or email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await Axios.post("/login", {
        usernameOrEmail,
        password,
      });

      if (response.data.success) {
        setUser({
          username: response.data.data.username,
          email: response.data.data.email,
        });
        handleClose();
        setStatus({
          msg: response.data.msg,
          severity: "success",
        });
      }
    } catch (e) {
      setPassword("");
      if (e instanceof AxiosError) {
        if (e.response)
          return setStatus({
            msg: e.response.data.error,
            severity: "error",
          });
      }
      return setStatus({
        msg: e.message,
        severity: "error",
      });
    }
  };
  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        p: 5,
        backgroundColor: "#fff",
      }}
    >
      <Typography fontSize="2.5rem" fontWeight="700">
        Sign in
      </Typography>
      <TextField
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        fullWidth
        error={usernameOrEmailError !== ""}
        helperText={usernameOrEmailError}
        label="Username or Email"
        placeholder="Type your username or email"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        error={passwordError !== ""}
        helperText={passwordError}
        label="Password"
        type="password"
        placeholder="Type your password"
      />
      <Link
        color="#999999"
        sx={{ alignSelf: "end", cursor: "pointer" }}
        onClick={() => setIsLogin(false)}
      >
        Sign up?
      </Link>
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: ".25rem",
          fontSize: "1.5rem",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #EA5455 50%, #002B5B 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0%",
          transition: "all .2s ease-in-out",
          color: "white",
        }}
        onMouseOver={(e) => {
          e.target.style.color = "white";
          e.target.style.backgroundPosition = "0% 0%";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "white";
          e.target.style.backgroundPosition = "100% 0%";
        }}
      >
        Login
      </button>
    </Box>
  );
};

export default LoginForm;
