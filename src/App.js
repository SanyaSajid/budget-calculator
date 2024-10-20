import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    // Load transactions from local storage if they exist
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  // Calculate totals and balance whenever transactions change
  useEffect(() => {
    const income = transactions
      .filter(transaction => transaction.type === 'Income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenses = transactions
      .filter(transaction => transaction.type === 'Expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    setIncomeTotal(income);
    setExpenseTotal(expenses);
    setBalance(income - expenses);

    // Save transactions to local storage
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = transaction => {
    setTransactions([transaction, ...transactions]);
  };

  // Delete a transaction
  const deleteTransaction = index => {
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
  };

  return (
    <div className="App">
      <Summary income={incomeTotal} expenses={expenseTotal} balance={balance} />
      <div className="main-content">
        <TransactionForm onAddTransaction={addTransaction} />
        <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
        <PieChart transactions={transactions} />
      </div>
    </div>
  );
};

export default App;
