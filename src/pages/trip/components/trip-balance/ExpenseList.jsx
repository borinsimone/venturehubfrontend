import React from 'react';

const ExpenseList = ({ expenses, users, onDeleteExpense }) => {
  const getUserName = (userId) => {
    const user = users.find((user) => user.id == userId);
    return user ? user.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (expenses.length === 0) {
    return (
      <div className='expense-list-container'>
        <h2>Expenses</h2>
        <p className='no-expenses'>No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className='expense-list-container'>
      <h2>Expenses</h2>
      <ul className='expense-list'>
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className='expense-item'
          >
            <div className='expense-header'>
              <h3>{expense.description}</h3>
              <span className='expense-amount'>
                ${expense.amount.toFixed(2)}
              </span>
            </div>
            <div className='expense-details'>
              <p>
                Paid by: <strong>{getUserName(expense.paidBy)}</strong> •{' '}
                {formatDate(expense.date)}
              </p>
              <p>
                Participants:{' '}
                {expense.participants.map((id) => getUserName(id)).join(', ')}
              </p>
              <button
                className='delete-button'
                onClick={() => onDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
