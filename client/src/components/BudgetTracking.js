import React, { useState, useEffect } from 'react';
import { Typography, Paper, LinearProgress, Box, TextField, Button } from '@mui/material';

// Dummy transactions data
const dummyTransactions = [
  { id: 1, description: 'Grocery', amount: -50, date: '2024-08-18', category: 'Food' },
  { id: 2, description: 'Salary', amount: 1500, date: '2024-08-17', category: 'Income' },
  { id: 3, description: 'Electricity Bill', amount: -75, date: '2024-08-16', category: 'Utilities' },
];

const BudgetTracking = () => {
  const [budget, setBudget] = useState(1000);  // Default budget value
  const [newBudget, setNewBudget] = useState(budget);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate total spent based on dummy transactions
  const totalSpent = dummyTransactions.reduce((sum, transaction) => 
    sum + (transaction.amount < 0 ? -transaction.amount : 0), 0);

  // Calculate remaining budget
  const remainingBudget = budget - totalSpent;

  // Calculate progress based on totalSpent and budget
  const progress = budget > 0 ? (totalSpent / budget) * 100 : 0;

  useEffect(() => {
    // Update newBudget state when budget changes
    setNewBudget(budget);
  }, [budget]);

  useEffect(() => {
    console.log('Transactions:', dummyTransactions);
    console.log('Total Spent:', totalSpent);
    console.log('Budget:', budget);
    console.log('Remaining Budget:', remainingBudget);
    console.log('Progress:', progress);
  }, [dummyTransactions, budget, totalSpent, remainingBudget, progress]);

  const handleBudgetChange = () => {
    setBudget(newBudget);
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Budget Tracking
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">Budget: ${budget}</Typography>
        <Typography variant="body2">Spent: ${totalSpent}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" style={{ marginTop: '10px' }}>
        <Typography variant="body2">Remaining: ${remainingBudget}</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={Math.min(progress, 100)}  // Ensure progress doesn't exceed 100%
        style={{ marginTop: '10px', height: '10px', borderRadius: '5px' }} 
      />
      <Box display="flex" justifyContent="space-between" style={{ marginTop: '10px' }}>
        <Typography variant="body2" color="textSecondary">0%</Typography>
        <Typography variant="body2" color="textSecondary">{progress.toFixed(2)}%</Typography>
        <Typography variant="body2" color="textSecondary">100%</Typography>
      </Box>
      {isEditing ? (
        <Box style={{ marginTop: '10px' }}>
          <TextField
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            label="Set New Budget"
            variant="outlined"
            size="small"
          />
          <Button onClick={handleBudgetChange} variant="contained" style={{ marginLeft: '10px' }}>
            Save
          </Button>
        </Box>
      ) : (
        <Button onClick={() => setIsEditing(true)} variant="contained" style={{ marginTop: '10px' }}>
          Edit Budget
        </Button>
      )}
    </Paper>
  );
};

export default BudgetTracking;
