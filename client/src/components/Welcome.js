import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, createTheme, ThemeProvider } from "@mui/material";
import { useAuth } from '../context/AuthContext'; // Make sure the path is correct based on your project structure

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Adjust this color to match your branding
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Keeps button text in normal case
    },
  },
});

const Welcome = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const { login } = useAuth(); // Use the login method from the context

  const handleSubmission = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://your-backend-url/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        login();  // Login the user if sign up is successful
        setError('');
      } else {
        throw new Error(data.message || 'Failed to sign up');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBypassLogin = () => {
    login(); // Directly log in without credentials
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} style={{ marginTop: '20vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>Sign Up / Login</Typography>
          {error && <Typography color="error">{error}</Typography>}  // Display error messages
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '20px 0' }}
            onClick={handleSubmission}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleBypassLogin}
          >
            Bypass Login
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Welcome;
