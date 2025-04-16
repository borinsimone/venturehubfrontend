import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';
import TripNavbar from '../../TripNavbar';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import BalanceDisplay from './BalanceDisplay';
import { FaPlus, FaTimes } from 'react-icons/fa';
import './TripBudget.scss';

interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
}

type TabType = 'expenses' | 'balance' | 'statistics';

const TripBudget = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const { activeTrip } = useGlobalContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('expenses');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTrip?.participants) {
      const participants = activeTrip.participants.map((name, index) => ({
        id: index.toString(),
        name,
      }));

      setUsers([{ id: 'you', name: 'Tu' }, ...participants]);

      if (activeTrip.balances && activeTrip.totalExpenses) {
        const sampleExpense = {
          id: Date.now(),
          description: 'Spese iniziali',
          amount: activeTrip.totalExpenses,
          paidBy: 'you',
          participants: ['you', ...participants.map((p) => p.id)],
          date: new Date().toISOString(),
        };

        setExpenses([sampleExpense]);
      }
    }
  }, [activeTrip]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  const deleteExpense = (expenseId: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  const calculateBalances = () => {
    const balances: Record<string, number> = {};

    users.forEach((user) => {
      balances[user.id] = 0;
    });

    expenses.forEach((expense) => {
      const paidById = expense.paidBy;
      const amount = parseFloat(expense.amount.toString());
      const participants = expense.participants;
      const splitAmount = amount / participants.length;

      balances[paidById] += amount;

      participants.forEach((participantId) => {
        balances[participantId] -= splitAmount;
      });
    });

    return balances;
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = '';
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    closePopup();
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'expenses':
        return (
          <div className='full-width-panel'>
            <button
              className='add-expense-button'
              onClick={openPopup}
            >
              <FaPlus /> Aggiungi Spesa
            </button>
            <ExpenseList
              expenses={expenses}
              users={users}
              onDeleteExpense={deleteExpense}
            />
          </div>
        );
      case 'balance':
        return (
          <div className='full-width-panel'>
            <BalanceDisplay
              users={users}
              balances={calculateBalances()}
            />
          </div>
        );
      case 'statistics':
        return <div className='full-width-panel'>Statistiche</div>;
      default:
        return null;
    }
  };

  return (
    <div className='trip-budget-container'>
      <div className='trip-budget-header'>
        <h1>Spese del viaggio</h1>
        <p>Gestisci le spese e vedi chi deve cosa a chi</p>
      </div>

      <div
        className='tabs-container'
        ref={tabsRef}
      >
        <div
          className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => handleTabClick('expenses')}
          data-tab='expenses'
        >
          Spese
        </div>
        <div
          className={`tab ${activeTab === 'balance' ? 'active' : ''}`}
          onClick={() => handleTabClick('balance')}
          data-tab='balance'
        >
          Bilancio
        </div>
        <div
          className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => handleTabClick('statistics')}
          data-tab='statistics'
        >
          Statistiche
        </div>
      </div>

      <div className='trip-budget-content'>{renderTabContent()}</div>

      <div className={`popup-overlay ${isPopupOpen ? 'active' : ''}`}>
        <div className='popup-container'>
          <div className='popup-header'>
            <h2>Aggiungi Spesa</h2>
            <button
              className='close-button'
              onClick={closePopup}
            >
              <FaTimes />
            </button>
          </div>
          <div className='popup-content'>
            <ExpenseForm
              users={users}
              onAddExpense={handleAddExpense}
            />
          </div>
        </div>
      </div>

      <TripNavbar />
    </div>
  );
};

export default TripBudget;
