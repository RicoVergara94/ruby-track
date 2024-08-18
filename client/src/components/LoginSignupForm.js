import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container, Paper } from "@mui/material";

const LoginSignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful sign-up (e.g., redirect to dashboard or login)
        console.log("User signed up successfully:", data);
      } else {
        setErrorMessage(data.error || "Failed to sign up.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("Failed to connect to server.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ marginTop: "20vh", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5" style={{ margin: "20px 0" }}>
          Sign Up / Login
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginSignupForm;
