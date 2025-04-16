import React from 'react';
import './TripHome.css';

import { useGlobalContext } from '../../../../context/GlobalContext';
import Meteo from './Meteo';

// TypeScript interfaces for trip data
interface Balance {
  username: string;
  amount: number;
}

interface TodoItem {
  text: string;
  checked: boolean;
}

interface TripData {
  id: string;
  destination: string;
  image: string;
  date: string;
  participants: string[];
  balances: Balance[];
  totalExpenses: number;
  mainToDo: TodoItem[];
}

interface TripHomeProps {
  activeTrip: TripData;
}

function TripHome({ activeTrip }: TripHomeProps) {
  // Mock weather data (would come from an API in a real app)

  // Mock next event
  const nextEvent = {
    title: 'Visita al Colosseo',
    date: '12 aprile',
    time: '10:00',
    location: 'Roma, Italia',
  };

  return (
    <div className='trip-home-container'>
      <div
        className='trip-overview-grid'
        onClick={() => {
          console.log(activeTrip);
        }}
      >
        {/* Weather section */}
        <Meteo />
        {/* Next event section */}
        <div className='overview-card event-card'>
          <h2>Prossimo Evento</h2>
          <div className='event-info'>
            <h3>{nextEvent.title}</h3>
            <p>
              {nextEvent.date} • {nextEvent.time}
            </p>
            <p>{nextEvent.location}</p>
          </div>
        </div>

        {/* Economic balance section */}
        <div className='overview-card balance-card'>
          <h2>Bilancio Economico</h2>
          <div className='balance-total'>
            <p>Spese Totali: €{activeTrip.totalExpenses.toFixed(2)}</p>
          </div>
          <div className='balance-list'>
            {activeTrip.balances.map((balance, index) => (
              <div
                key={index}
                className={`balance-item ${
                  balance.amount < 0 ? 'negative' : 'positive'
                }`}
              >
                <span>{balance.username}:</span>
                <span>€{balance.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* To-do section */}
        <div className='overview-card todo-card'>
          <h2>Da Fare</h2>
          <div className='todo-list'>
            {activeTrip?.mainToDo?.map((todo, index) => (
              <div
                key={index}
                className='todo-item'
              >
                <input
                  type='checkbox'
                  checked={todo.checked}
                  readOnly
                />
                <span className={todo.checked ? 'completed' : ''}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripHome;
