import React, { useState } from 'react';

function UserPreferencesSection() {
  const [timeFormat, setTimeFormat] = useState('24h');
  const [currency, setCurrency] = useState('EUR');
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [theme, setTheme] = useState('light');

  return (
    <section className='settings-section'>
      <h2>La Tua Prospettiva</h2>

      <div className='setting-item-row'>
        <div className='setting-item'>
          <label htmlFor='time-format'>Formato orario</label>
          <select
            id='time-format'
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value)}
          >
            <option value='12h'>12 ore (AM/PM)</option>
            <option value='24h'>24 ore</option>
          </select>
        </div>

        <div className='setting-item'>
          <label htmlFor='currency'>Valuta</label>
          <select
            id='currency'
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value='EUR'>Euro (€)</option>
            <option value='USD'>Dollaro USA ($)</option>
            <option value='GBP'>Sterlina (£)</option>
            <option value='JPY'>Yen (¥)</option>
          </select>
        </div>
      </div>

      <div className='setting-item-row'>
        <div className='setting-item'>
          <label htmlFor='measurement'>Unità di misura</label>
          <select
            id='measurement'
            value={measurementUnit}
            onChange={(e) => setMeasurementUnit(e.target.value)}
          >
            <option value='metric'>Metriche (km, kg)</option>
            <option value='imperial'>Imperiali (mi, lb)</option>
          </select>
        </div>

        <div className='setting-item'>
          <label htmlFor='theme'>Tema</label>
          <select
            id='theme'
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value='light'>Chiaro</option>
            <option value='dark'>Scuro</option>
            <option value='destination'>Colori della destinazione</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default UserPreferencesSection;
