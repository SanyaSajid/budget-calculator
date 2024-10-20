import React from 'react';
import incomeIcon from '../icons/income.png';
import expenseIcon from '../icons/expense.png'; 

const Summary = ({ income, expenses, balance }) => {
  return (
    <div className="summary">
      <div className="Abalance">
      < p className='p'>Available Balance</p>
      <div className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}>${balance}</div>
      </div>
      <div className="income-expense">
      <div className="income">
  <div><img 
            src={incomeIcon} 
            alt="Income Icon" 
            className="icon" 
        /></div>
    <div className='value'>
        ${income}
    </div>
    <div className='heading'>
        Income
    </div>
</div>


<div className="expense">
  <div><img 
            src={expenseIcon} 
            alt="Expense Icon" 
            className="icon" 
        /></div>
    <div className='value'>
        ${expenses}
    </div>
    <div className='heading'>
        Expenses
    </div>
</div>
      </div>
    </div>
  );
};

export default Summary;

