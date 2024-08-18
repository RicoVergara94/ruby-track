// src/components/AuthForm.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = credentials;
    const url = isLogin ? 'http://localhost:4000/login' : 'http://localhost:4000/signup';

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setOpen(true);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      console.log(data);  // Handle the response accordingly

      login();  // Log the user in after a successful signup or login
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5">{isLogin ? 'Login' : 'Sign Up'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            margin="normal"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              margin="normal"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
            />
          )}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Button
            fullWidth
            color="secondary"
            sx={{ mt: 1 }}
            onClick={() => setIsLogin(!isLogin)}
          >
            Switch to {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </form>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthForm;
