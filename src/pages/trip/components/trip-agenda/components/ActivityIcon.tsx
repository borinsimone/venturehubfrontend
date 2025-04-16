import {
  FaPlane,
  FaHotel,
  FaTree,
  FaHiking,
  FaUtensils,
  FaMapMarked,
  FaWalking,
  FaBuilding,
  FaTrain,
  FaBus,
  FaCar,
  FaShip,
  FaCoffee,
} from 'react-icons/fa';

interface ActivityIconProps {
  type: string;
}

function ActivityIcon({ type }: ActivityIconProps) {
  switch (type.toLowerCase()) {
    case 'flight':
    case 'trasporto':
      return <FaPlane className={`activity-icon flight`} />;
    case 'hotel':
    case 'alloggio':
      return <FaHotel className={`activity-icon hotel`} />;
    case 'food':
    case 'ristorazione':
      return <FaUtensils className={`activity-icon food`} />;
    case 'walk':
    case 'escursione':
      return <FaWalking className={`activity-icon hiking`} />;
    case 'park':
    case 'natura':
      return <FaTree className={`activity-icon park`} />;
    case 'hiking':
      return <FaHiking className={`activity-icon hiking`} />;
    case 'monument':
    case 'cultura':
      return <FaBuilding className={`activity-icon hiking`} />;
    case 'train':
      return <FaTrain className={`activity-icon flight`} />;
    case 'bus':
      return <FaBus className={`activity-icon flight`} />;
    case 'car':
      return <FaCar className={`activity-icon flight`} />;
    case 'boat':
      return <FaShip className={`activity-icon flight`} />;
    case 'tempo libero':
      return <FaCoffee className={`activity-icon food`} />;
    default:
      return <FaMapMarked className={`activity-icon`} />;
  }
}

export default ActivityIcon;
