import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Box, useTheme } from '@mui/material';
import io from 'socket.io-client';
import TransactionHistory from './TransactionHistory';
import SpendingCategories from './SpendingCategories';
import BudgetTracking from './BudgetTracking';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const socket = io('http://localhost:4000'); // Adjust this if your server runs on a different port

    socket.on('newTransaction', (newTransaction) => {
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container component="main" maxWidth="xl" sx={{ padding: '20px', backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ padding: '20px', width: '100%', marginBottom: '20px' }}>
            <TransactionHistory transactions={transactions} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ padding: '20px', width: '100%', marginBottom: '20px' }}>
            <SpendingCategories transactions={transactions} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ padding: '20px', width: '100%', marginBottom: '20px' }}>
            <BudgetTracking transactions={transactions} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
