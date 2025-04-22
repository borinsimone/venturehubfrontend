import React, { useState } from 'react';

function TravelCompanionsSection() {
  const [companions, setCompanions] = useState([]);

  return (
    <section className='settings-section'>
      <h2>La Tua Compagnia di Viaggio</h2>
      <div className='setting-item'>
        <button className='add-companion-btn'>
          + Aggiungi compagno di viaggio
        </button>

        <div className='companions-list'>
          <p className='empty-state'>
            Non hai ancora aggiunto compagni di viaggio
          </p>
          {/* Companion items would be rendered here */}
        </div>

        <div className='roles-management'>
          <h3>Gestione ruoli</h3>
          <p>Assegna ruoli ai compagni per organizzare meglio il viaggio</p>
          <div className='roles-list'>
            <div className='role-item'>
              <span className='role-name'>Organizzatore</span>
              <span className='role-description'>
                Può modificare tutti gli aspetti del viaggio
              </span>
            </div>
            <div className='role-item'>
              <span className='role-name'>Fotografo</span>
              <span className='role-description'>
                Responsabile di catturare i momenti del viaggio
              </span>
            </div>
            <div className='role-item'>
              <span className='role-name'>Navigatore</span>
              <span className='role-description'>
                Responsabile delle mappe e dei tragitti
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelCompanionsSection;
