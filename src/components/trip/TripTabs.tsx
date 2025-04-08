import { useState } from 'react';
import TripGeneral from './TripGeneral';
import TripAgenda from './TripAgenda';
import TripBudget from './TripBudget';
import TripUtilities from './TripUtilities';

type TripTabsProps = {
  tripId: string;
};

type TabName = 'general' | 'agenda' | 'budget' | 'utilities';

const TripTabs = ({ tripId }: TripTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabName>('general');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <TripGeneral tripId={tripId} />;
      case 'agenda':
        return <TripAgenda tripId={tripId} />;
      case 'budget':
        return <TripBudget tripId={tripId} />;
      case 'utilities':
        return <TripUtilities tripId={tripId} />;
      default:
        return <TripGeneral tripId={tripId} />;
    }
  };

  return (
    <div className='trip-tabs-container'>
      <div className='trip-tabs-header'>
        <button
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`tab-button ${activeTab === 'agenda' ? 'active' : ''}`}
          onClick={() => setActiveTab('agenda')}
        >
          Agenda
        </button>
        <button
          className={`tab-button ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          Money
        </button>
        <button
          className={`tab-button ${activeTab === 'utilities' ? 'active' : ''}`}
          onClick={() => setActiveTab('utilities')}
        >
          Utilities
        </button>
      </div>
      <div className='trip-tabs-content'>{renderTabContent()}</div>
    </div>
  );
};

export default TripTabs;
