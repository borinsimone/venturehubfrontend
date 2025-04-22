import React from 'react';
import TripNavbar from '../../TripNavbar';
import TripIdentitySection from './TripIdentitySection';
import TravelCompanionsSection from './TravelCompanionsSection';
import NotificationsSection from './NotificationsSection';
import UserPreferencesSection from './UserPreferencesSection';
import DataManagementSection from './DataManagementSection';
import './TripSettings.css';

function TripSettings() {
  return (
    <div className='trip-settings-container'>
      <TripNavbar />
      <div className='settings-content'>
        <h1>Impostazioni del Viaggio</h1>
        <p className='settings-subtitle'>
          Personalizza ogni aspetto della tua avventura
        </p>

        <TripIdentitySection />
        <TravelCompanionsSection />
        <NotificationsSection />
        <UserPreferencesSection />
        <DataManagementSection />
      </div>
    </div>
  );
}

export default TripSettings;
