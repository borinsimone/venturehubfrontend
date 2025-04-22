import React, { useState } from 'react';
import './CreateTrip.css';

interface Participant {
  id: number;
  name: string;
  email: string;
}

interface Activity {
  id: number;
  day: number;
  description: string;
  location: string;
  time: string;
}

function CreateTrip() {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: '', email: '' },
  ]);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, day: 1, description: '', location: '', time: '' },
  ]);

  const addParticipant = () => {
    const newId =
      participants.length > 0
        ? Math.max(...participants.map((p) => p.id)) + 1
        : 1;
    setParticipants([...participants, { id: newId, name: '', email: '' }]);
  };

  const removeParticipant = (id: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((p) => p.id !== id));
    }
  };

  const updateParticipant = (
    id: number,
    field: keyof Participant,
    value: string
  ) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addActivity = () => {
    const newId =
      activities.length > 0 ? Math.max(...activities.map((a) => a.id)) + 1 : 1;
    const lastDay =
      activities.length > 0 ? activities[activities.length - 1].day : 1;
    setActivities([
      ...activities,
      { id: newId, day: lastDay, description: '', location: '', time: '' },
    ]);
  };

  const removeActivity = (id: number) => {
    if (activities.length > 1) {
      setActivities(activities.filter((a) => a.id !== id));
    }
  };

  const updateActivity = (
    id: number,
    field: keyof Activity,
    value: string | number
  ) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tripData = {
      tripName,
      destination,
      startDate,
      endDate,
      budget,
      notes,
      participants,
      activities,
    };

    console.log('Trip created:', tripData);
    // Here you would typically send this data to your backend
    // For example: axios.post('/api/trips', tripData)

    alert('Viaggio creato con successo!');
  };

  return (
    <div className='create-trip-container'>
      <h1>Crea un Nuovo Viaggio</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-section'>
          <h2>Informazioni Generali</h2>

          <div className='form-group'>
            <label htmlFor='tripName'>Nome del Viaggio*</label>
            <input
              type='text'
              id='tripName'
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='destination'>Destinazione*</label>
            <input
              type='text'
              id='destination'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='startDate'>Data di Inizio*</label>
              <input
                type='date'
                id='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='endDate'>Data di Fine*</label>
              <input
                type='date'
                id='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='budget'>Budget (€)</label>
            <input
              type='number'
              id='budget'
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min='0'
            />
          </div>
        </div>

        <div className='form-section'>
          <h2>Partecipanti</h2>
          {participants.map((participant) => (
            <div
              className='participant-row'
              key={participant.id}
            >
              <div className='form-group'>
                <label>Nome Partecipante</label>
                <input
                  type='text'
                  value={participant.name}
                  onChange={(e) =>
                    updateParticipant(participant.id, 'name', e.target.value)
                  }
                  required
                />
              </div>

              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  value={participant.email}
                  onChange={(e) =>
                    updateParticipant(participant.id, 'email', e.target.value)
                  }
                />
              </div>

              <button
                type='button'
                className='remove-btn'
                onClick={() => removeParticipant(participant.id)}
              >
                Rimuovi
              </button>
            </div>
          ))}

          <button
            type='button'
            className='add-btn'
            onClick={addParticipant}
          >
            + Aggiungi Partecipante
          </button>
        </div>

        <div className='form-section'>
          <h2>Attività Programmate</h2>
          {activities.map((activity) => (
            <div
              className='activity-row'
              key={activity.id}
            >
              <div className='form-group small'>
                <label>Giorno</label>
                <input
                  type='number'
                  value={activity.day}
                  onChange={(e) =>
                    updateActivity(activity.id, 'day', parseInt(e.target.value))
                  }
                  min='1'
                  required
                />
              </div>

              <div className='form-group'>
                <label>Descrizione</label>
                <input
                  type='text'
                  value={activity.description}
                  onChange={(e) =>
                    updateActivity(activity.id, 'description', e.target.value)
                  }
                  required
                />
              </div>

              <div className='form-group'>
                <label>Luogo</label>
                <input
                  type='text'
                  value={activity.location}
                  onChange={(e) =>
                    updateActivity(activity.id, 'location', e.target.value)
                  }
                />
              </div>

              <div className='form-group small'>
                <label>Orario</label>
                <input
                  type='time'
                  value={activity.time}
                  onChange={(e) =>
                    updateActivity(activity.id, 'time', e.target.value)
                  }
                />
              </div>

              <button
                type='button'
                className='remove-btn'
                onClick={() => removeActivity(activity.id)}
              >
                Rimuovi
              </button>
            </div>
          ))}

          <button
            type='button'
            className='add-btn'
            onClick={addActivity}
          >
            + Aggiungi Attività
          </button>
        </div>

        <div className='form-section'>
          <h2>Note Aggiuntive</h2>
          <div className='form-group'>
            <textarea
              id='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder='Inserisci qui altre informazioni importanti sul viaggio...'
            />
          </div>
        </div>

        <div className='form-actions'>
          <button
            type='submit'
            className='submit-btn'
          >
            Crea Viaggio
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;
