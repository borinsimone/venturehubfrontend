import React, { useState } from 'react';

function TripIdentitySection() {
  const [tripName, setTripName] = useState('La mia avventura');
  const [tripDescription, setTripDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <section className='settings-section'>
      <h2>Identità del Viaggio</h2>
      <div className='setting-item'>
        <label htmlFor='trip-name'>Nome del viaggio</label>
        <input
          type='text'
          id='trip-name'
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder='Nome memorabile per la tua avventura'
        />
      </div>

      <div className='setting-item'>
        <label htmlFor='trip-description'>Descrizione</label>
        <textarea
          id='trip-description'
          value={tripDescription}
          onChange={(e) => setTripDescription(e.target.value)}
          placeholder='Racconta cosa rende speciale questo viaggio'
          rows={3}
        />
      </div>

      <div className='setting-item-row'>
        <div className='setting-item'>
          <label htmlFor='start-date'>Data di inizio</label>
          <input
            type='date'
            id='start-date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className='setting-item'>
          <label htmlFor='end-date'>Data di fine</label>
          <input
            type='date'
            id='end-date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className='setting-item'>
        <label htmlFor='cover-image'>Immagine di copertina</label>
        <div className='cover-image-uploader'>
          <button className='upload-btn'>Carica immagine</button>
          <span>o trascina qui il file</span>
        </div>
      </div>
    </section>
  );
}

export default TripIdentitySection;
