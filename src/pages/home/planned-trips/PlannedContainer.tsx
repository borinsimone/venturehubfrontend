import React, { useState } from 'react';
import Next from './Next';
import Prev from './Prev';
import { AnimatePresence } from 'framer-motion';
// import '../';
function PlannedContainer() {
  const [activeTab, setActiveTab] = useState('next');

  return (
    <div className='planned'>
      <div className='title'>
        <span
          className={activeTab === 'next' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('next')}
        >
          prossimi
        </span>{' '}
        <span
          className={activeTab === 'prev' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('prev')}
        >
          recenti
        </span>
      </div>
      <AnimatePresence mode='wait'>
        {activeTab === 'next' ? <Next /> : <Prev />}
      </AnimatePresence>
    </div>
  );
}

export default PlannedContainer;
