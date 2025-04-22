import {
  FaPlane,
  FaHotel,
  FaTree,
  FaHiking,
  FaUtensils,
  FaMapMarked,
} from 'react-icons/fa';

interface ActivityIconProps {
  type: string;
}

function ActivityIcon({ type }: ActivityIconProps) {
  switch (type.toLowerCase()) {
    case 'flight':
      return <FaPlane className={`activity-icon flight`} />;
    case 'hotel':
      return <FaHotel className={`activity-icon hotel`} />;
    case 'park':
      return <FaTree className={`activity-icon park`} />;
    case 'hiking':
      return <FaHiking className={`activity-icon hiking`} />;
    case 'food':
      return <FaUtensils className={`activity-icon food`} />;
    default:
      return <FaMapMarked className={`activity-icon`} />;
  }
}

export default ActivityIcon;
