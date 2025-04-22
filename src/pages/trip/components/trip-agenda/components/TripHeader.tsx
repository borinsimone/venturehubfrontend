import React from 'react';
import { useGlobalContext } from '../../../../../context/GlobalContext';

function TripHeader() {
  const { activeTrip } = useGlobalContext();
  return <div>{activeTrip.title}</div>;
}

export default TripHeader;
