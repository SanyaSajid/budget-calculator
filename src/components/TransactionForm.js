import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount || !category) return;

    onAddTransaction({
      type,
      category,
      amount: parseFloat(amount),
      description
    });

    setType('Income');
    setCategory('');
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
  <div>
    <h3>Transaction History</h3>
    <p className="select">Select Type</p>
    <button
      type="button"  // Changed to button to prevent form submission
      onClick={() => setType('Income')} 
      className={type === 'Income' ? 'active' : ''}
    >
      Income
    </button>
    <button
      type="button"  // Changed to button to prevent form submission
      onClick={() => setType('Expense')} 
      className={type === 'Expense' ? 'active' : ''}
    >
      Expense
    </button>
  </div>
  <select value={category} onChange={e => setCategory(e.target.value)}>
    <option value="">Select Category</option>
    {type === 'Income' && (
      <>
        <option value="Salary">Salary</option>
        <option value="Business">Business</option>
        <option value="Rental Income">Rental Income</option>
        <option value="Stocks">Stocks</option>
      </>
    )}
    {type === 'Expense' && (
      <>
        <option value="Grocery">Grocery</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
      </>
    )}
  </select>
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={e => setAmount(e.target.value)}
  />
  <textarea
    placeholder="Description"
    value={description}
    onChange={e => setDescription(e.target.value)}
    rows={8} // Adjust the number of rows as needed
    style={{ 
      width: '100%', 
      borderColor: '#D3D3D3',  // Set the desired border color
      borderRadius: '4px',  // Add a border radius
      overflow: 'hidden'  
    }}
></textarea>

  <button type="submit">Add Transaction</button>
</form>

  );
};

export default TransactionForm;
