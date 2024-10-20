import React from 'react';
import deleteIcon from '../icons/bin.png';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className={transaction.type.toLowerCase()}>
            <div className='paid'>
            <div>
            <span>
              {transaction.category}
            </span></div>
            <div>
    <span style={{ fontWeight: 'bold ', fontSize:"24px" }}>
        ${transaction.amount}
    </span>
</div>
         
          <div>
            <span>{transaction.description}</span></div>
            </div>
            <div className='pay'>
            <span style={{ color: transaction.type === 'Income' ? 'green' : 'red',   backgroundColor:transaction.type === 'Income' ? '#ECFFEA' : '#FFEAEA'}}>
              {transaction.type}
                     </span>

            {/* Delete Button */}
            <button onClick={() => onDeleteTransaction(index)} className="delete-btn">
            <div><img 
            src={deleteIcon} 
            alt="Delete Icon" 
            className="icon1" 
        /></div>
        
</button>

</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
