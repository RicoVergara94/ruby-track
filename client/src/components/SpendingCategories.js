import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary elements
Chart.register(ArcElement, Tooltip, Legend);

// Sample transactions data
const transactions = [
  { id: 1, description: 'Grocery', amount: -50, date: '2024-08-18', category: 'Food' },
  { id: 2, description: 'Salary', amount: 1500, date: '2024-08-17', category: 'Income' },
  { id: 3, description: 'Electricity Bill', amount: -75, date: '2024-08-16', category: 'Utilities' },
];

// Aggregate transactions by category
const aggregateByCategory = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
};

const SpendingCategories = () => {
  const aggregatedData = aggregateByCategory(transactions);

  // Prepare chart data
  const data = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        data: Object.values(aggregatedData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Spending Categories
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div style={{ width: '300px', height: '300px' }}>
          <Pie data={data} />
        </div>
      </div>
    </Paper>
  );
};

export default SpendingCategories;
