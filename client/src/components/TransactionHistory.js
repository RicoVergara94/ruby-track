import React from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import BudgetTracking from './BudgetTracking';
const transactions = [
  { id: 1, description: 'Grocery', amount: -50, date: '2024-08-18', category: 'Food' },
  { id: 2, description: 'Salary', amount: 1500, date: '2024-08-17', category: 'Income' },
  { id: 3, description: 'Electricity Bill', amount: -75, date: '2024-08-16', category: 'Utilities' },
];

const groupByDate = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

const TransactionHistory = () => {
  const groupedTransactions = groupByDate(transactions);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Transaction History
      </Typography>
      {Object.keys(groupedTransactions).map((date) => (
        <div key={date} style={{ marginBottom: '10px' }}>
          <Typography variant="subtitle1" style={{ marginTop: '10px', marginBottom: '5px', fontWeight: 'bold' }}>
            {new Date(date).toLocaleDateString()}
          </Typography>
          <List dense>
            {groupedTransactions[date].map((transaction) => (
              <ListItem key={transaction.id} style={{ paddingTop: '0', paddingBottom: '0' }}>
                <ListItemText
                  primary={`${transaction.description} - $${transaction.amount}`}
                  secondary={`${new Date(transaction.date).toLocaleDateString()} | ${transaction.category}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </Paper>
  );
};

export default TransactionHistory;
