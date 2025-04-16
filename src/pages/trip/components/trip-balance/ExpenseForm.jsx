import React, { useState } from 'react';

const ExpenseForm = ({ users, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !paidBy || participants.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    const newExpense = {
      description,
      amount: parseFloat(amount),
      paidBy,
      participants,
      date: new Date().toISOString(),
    };

    onAddExpense(newExpense);

    // Reset form
    setDescription('');
    setAmount('');
    setPaidBy('');
    setParticipants([]);
  };

  const handleParticipantChange = (userId) => {
    if (participants.includes(userId)) {
      setParticipants(participants.filter((id) => id !== userId));
    } else {
      setParticipants([...participants, userId]);
    }
  };

  return (
    <div className='expense-form-container'>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Description:</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Dinner, Movie tickets, etc.'
          />
        </div>

        <div className='form-group'>
          <label>Amount:</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='0.00'
            step='0.01'
            min='0'
          />
        </div>

        <div className='form-group'>
          <label>Paid by:</label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          >
            <option value=''>Select who paid</option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label>Participants:</label>
          <div className='participants-checkboxes'>
            {users.map((user) => (
              <div
                key={user.id}
                className='participant-checkbox'
              >
                <input
                  type='checkbox'
                  id={`participant-${user.id}`}
                  checked={participants.includes(user.id)}
                  onChange={() => handleParticipantChange(user.id)}
                />
                <label htmlFor={`participant-${user.id}`}>{user.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          type='submit'
          className='submit-button'
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
