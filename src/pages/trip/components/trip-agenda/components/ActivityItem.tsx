import { Activity } from '../types';
import ActivityIcon from './ActivityIcon';

interface ActivityItemProps {
  activity: Activity;
  isCurrent: boolean;
}

function ActivityItem({ activity, isCurrent }: ActivityItemProps) {
  // Determine appropriate background class for the card
  const getCardClass = () => {
    switch (activity.type) {
      case 'flight':
        return 'flight';
      case 'hotel':
        return 'hotel';
      case 'park':
        return 'park';
      case 'food':
        return 'food';
      default:
        return '';
    }
  };

  return (
    <div className='timeline-item'>
      <div className='timeline-line'>
        <div className='timeline-dot'></div>
      </div>

      <div className={`activity-card ${getCardClass()}`}>
        <div className={`activity-icon-container ${activity.type}`}>
          <ActivityIcon type={activity.type} />
        </div>

        <div className='activity-details'>
          <div className='activity-title'>{activity.name}</div>

          {activity.details && (
            <div className='activity-subtext'>{activity.details}</div>
          )}

          {activity.type === 'flight' && activity.from && activity.to && (
            <div className='activity-subtext'>
              da {activity.from}
              <br />a {activity.to}
            </div>
          )}

          {activity.location && (
            <div className='activity-subtext'>{activity.location}</div>
          )}
        </div>

        <div className='activity-time'>{activity.time}</div>
      </div>
    </div>
  );
}

export default ActivityItem;
