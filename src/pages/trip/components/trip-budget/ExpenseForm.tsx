import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
}

interface ExpenseFormProps {
  users: User[];
  onAddExpense: (expense: {
    description: string;
    amount: number;
    paidBy: string;
    participants: string[];
    date: string;
  }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ users, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !paidBy || participants.length === 0) {
      alert('Per favore, compila tutti i campi');
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

  const handleParticipantChange = (userId: string) => {
    if (participants.includes(userId)) {
      setParticipants(participants.filter((id) => id !== userId));
    } else {
      setParticipants([...participants, userId]);
    }
  };

  return (
    <div className='expense-form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Aggiungi spesa</h2>
        <div className='form-group'>
          <label>Descrizione:</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Cena, Biglietti museo, ecc.'
          />
        </div>

        <div className='form-group'>
          <label>Importo (€):</label>
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
          <label>Pagato da:</label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          >
            <option value=''>Seleziona chi ha pagato</option>
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
          <label>Partecipanti:</label>
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
          Aggiungi spesa
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
