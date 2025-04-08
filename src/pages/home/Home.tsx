import React from 'react';
import { BiBell } from 'react-icons/bi';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import './Home.css';
import Popular from './Popular';
import PlannedContainer from './planned-trips/PlannedContainer';
function Home() {
  return (
    <div className='home'>
      <div className='top-bar'>
        <div className='user-img'>
          <img
            src='https://picsum.photos/500'
            alt='User profile'
          />
        </div>
        <div className='notification'>
          <BiBell size='25px' />
        </div>
      </div>

      <div className='main-content'>
        <div className='title'>
          Scopri <br /> un nuovo mondo
        </div>
        <button>pianifica avventura</button>
        <div className='input-wrapper'>
          <input
            type='text'
            placeholder='location, country..'
          />
          <FaMagnifyingGlass
            size='25px'
            style={{
              position: 'absolute',
              right: '10px',
            }}
          />
        </div>
      </div>
      <Popular />
      <PlannedContainer />
    </div>
  );
}

export default Home;
