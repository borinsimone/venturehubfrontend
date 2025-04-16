import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import BalanceDisplay from './BalanceDisplay';
import './TricountStyles.css';

const TricountPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  // Calculate balances between all users
  const calculateBalances = () => {
    const balances = {};

    // Initialize balances
    users.forEach((user) => {
      balances[user.id] = 0;
    });

    // Add up all expenses
    expenses.forEach((expense) => {
      const paidById = expense.paidBy;
      const amount = parseFloat(expense.amount);
      const participants = expense.participants;
      const splitAmount = amount / participants.length;

      // Add the full amount to the person who paid
      balances[paidById] += amount;

      // Subtract each participant's share
      participants.forEach((participantId) => {
        balances[participantId] -= splitAmount;
      });
    });

    return balances;
  };

  return (
    <div className='tricount-container'>
      <h1>Group Expenses Tracker</h1>

      <div className='tricount-content'>
        <div className='left-panel'>
          <ExpenseForm
            users={users}
            onAddExpense={addExpense}
          />
          <BalanceDisplay
            users={users}
            balances={calculateBalances()}
          />
        </div>

        <div className='right-panel'>
          <ExpenseList
            expenses={expenses}
            users={users}
            onDeleteExpense={deleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default TricountPage;
