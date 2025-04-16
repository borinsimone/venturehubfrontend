import {
  FaPlaneDeparture,
  FaHotel,
  FaTree,
  FaHiking,
  FaUtensils,
} from 'react-icons/fa';

interface ActivityIconProps {
  type: string;
}

function ActivityIcon({ type }: ActivityIconProps) {
  switch (type) {
    case 'flight':
      return <FaPlaneDeparture className='activity-icon flight' />;
    case 'hotel':
      return <FaHotel className='activity-icon hotel' />;
    case 'park':
      return <FaTree className='activity-icon park' />;
    case 'hiking':
      return <FaHiking className='activity-icon hiking' />;
    case 'food':
      return <FaUtensils className='activity-icon food' />;
    default:
      return <div className='activity-icon default'></div>;
  }
}

export default ActivityIcon;
