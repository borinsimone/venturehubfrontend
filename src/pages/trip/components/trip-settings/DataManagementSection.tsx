import React from 'react';

function DataManagementSection() {
  return (
    <section className='settings-section'>
      <h2>I Tuoi Ricordi, I Tuoi Dati</h2>

      <div className='setting-item'>
        <h3>Esporta viaggio</h3>
        <div className='export-buttons'>
          <button className='export-btn'>PDF</button>
          <button className='export-btn'>Calendario</button>
          <button className='export-btn'>Condividi link</button>
        </div>
      </div>

      <div className='setting-item'>
        <h3>Gestione dati</h3>
        <div className='data-management-buttons'>
          <button className='archive-btn'>Archivia viaggio</button>
          <button className='delete-btn'>Elimina viaggio</button>
        </div>
      </div>

      <div className='setting-item'>
        <h3>Privacy</h3>
        <div className='privacy-option'>
          <input
            type='checkbox'
            id='privacy-public'
          />
          <label htmlFor='privacy-public'>
            Viaggio pubblico (visibile agli amici)
          </label>
        </div>
        <div className='privacy-option'>
          <input
            type='checkbox'
            id='privacy-searchable'
          />
          <label htmlFor='privacy-searchable'>Viaggio ricercabile</label>
        </div>
      </div>
    </section>
  );
}

export default DataManagementSection;
