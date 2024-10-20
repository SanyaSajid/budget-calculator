import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import datalabels plugin

// Register necessary components in ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ transactions }) => {

  // Filter income and expense transactions
  const incomeTransactions = transactions.filter(t => t.type === 'Income');
  const expenseTransactions = transactions.filter(t => t.type === 'Expense');

  // Aggregate income categories and amounts
  const incomeCategories = incomeTransactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) acc[transaction.category] = 0;
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {});

  // Aggregate expense categories and amounts
  const expenseCategories = expenseTransactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) acc[transaction.category] = 0;
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {});

  // Calculate total amounts for percentage calculations
  const totalIncome = Object.values(incomeCategories).reduce((a, b) => a + b, 0);
  const totalExpense = Object.values(expenseCategories).reduce((a, b) => a + b, 0);

  // Income Doughnut Chart Data
  const incomeData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        label: 'Income',
        data: Object.values(incomeCategories),
        backgroundColor:['#04BFDA', '#FB67CA', '#9B88ED', '#FFA84A', '#9966ff'],
        hoverOffset: 4,
        cutout: '50%', // Creates the hole in the center to match the donut shape
      },
    ],
  };

  // Expense Doughnut Chart Data
  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: 'Expense',
        data: Object.values(expenseCategories),
        backgroundColor: ['#04BFDA', '#FB67CA', '#9B88ED', '#FFA84A', '#9966ff'],
        hoverOffset: 4,
        cutout: '50%', // Creates the hole in the center to match the donut shape
      },
    ],
  };

  // Common chart options including percentage display
  const options = {
    plugins: {
      datalabels: {
        color: '#fff', // Text color
        formatter: (value, context) => {
          const dataset = context.dataset.data;
          const total = dataset.reduce((acc, val) => acc + val, 0);
          const percentage = (value / total * 100).toFixed(2) + '%'; // Calculate percentage
          return percentage;
        },
        anchor: 'center', // Position inside the chart segment
        align: 'center',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
  };

  // Return the doughnut charts with labels and percentages
  return (
    <div className="pie-charts">
      <h3 className='sum'>Transaction Summary</h3> {/* Transaction Summary Heading */}
      <div className="income-chart">
        <h4>Income</h4>
        <Pie data={incomeData} options={options} />
      </div>
      <div className="expense-chart">
        <h4>Expense</h4>
        <Pie data={expenseData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
