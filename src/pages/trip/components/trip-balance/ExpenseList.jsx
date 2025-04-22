import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ExpenseList = ({ expenses, users, onDeleteExpense }) => {
  const getUserName = (userId) => {
    const user = users.find((user) => user.id == userId);
    return user ? user.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (expenses.length === 0) {
    return (
      <div className='expense-list-container'>
        <h2>Spese</h2>
        <p className='no-expenses'>
          Nessuna spesa registrata. Aggiungi la tua prima spesa!
        </p>
      </div>
    );
  }

  return (
    <div className='expense-list-container'>
      <h2>Spese</h2>
      <ul className='expense-list'>
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className='expense-item'
          >
            <div className='expense-header'>
              <h3>{expense.description}</h3>
              <span className='expense-amount'>
                €{expense.amount.toFixed(2)}
              </span>
            </div>
            <div className='expense-details'>
              <p>
                Pagato da: <strong>{getUserName(expense.paidBy)}</strong> •{' '}
                {formatDate(expense.date)}
              </p>
              <p>
                Partecipanti:{' '}
                {expense.participants.map((id) => getUserName(id)).join(', ')}
              </p>
              <button
                className='delete-button'
                onClick={() => onDeleteExpense(expense.id)}
              >
                <FaTrash /> Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
