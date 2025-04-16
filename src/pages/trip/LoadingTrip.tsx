import React from 'react';
import './LoadingTrip.scss';

function LoadingTrip() {
  return (
    <div className='loading-trip-container'>
      <div className='loading-content'>
        <div className='loading-map'>
          <div className='map-pin'></div>
        </div>

        <div className='loading-icons'>
          <div className='loading-icon plane'></div>
          <div className='loading-icon car'></div>
          <div className='loading-icon backpack'></div>
        </div>

        <div className='loading-text'>
          <span>P</span>
          <span>r</span>
          <span>e</span>
          <span>p</span>
          <span>a</span>
          <span>r</span>
          <span>a</span>
          <span>n</span>
          <span>d</span>
          <span>o</span>
          <span>&nbsp;</span>
          <span>i</span>
          <span>l</span>
          <span>&nbsp;</span>
          <span>v</span>
          <span>i</span>
          <span>a</span>
          <span>g</span>
          <span>g</span>
          <span>i</span>
          <span>o</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingTrip;
