import { Activity } from '../types';
import ActivityIcon from './ActivityIcon';

interface ActivityItemProps {
  activity: Activity;
  isCurrent: boolean;
}

function ActivityItem({ activity, isCurrent }: ActivityItemProps) {
  return (
    <div
      className={`timeline-item ${activity.completed ? 'completed' : ''} ${
        isCurrent ? 'current' : ''
      }`}
    >
      <div className='timeline-line'>
        <div
          className={`timeline-dot ${activity.completed ? 'completed' : ''} ${
            isCurrent ? 'current' : ''
          }`}
        ></div>
      </div>
      <div className='activity-card'>
        <div className={`activity-icon-container ${activity.type}`}>
          <ActivityIcon type={activity.type} />
        </div>
        <div className='activity-details'>
          <div className='activity-title'>{activity.title}</div>
          {activity.from && activity.to && (
            <div className='activity-route'>
              <div className='route-from'>da {activity.from}</div>
              <div className='route-to'>a {activity.to}</div>
            </div>
          )}
          {activity.details && (
            <div className='activity-subtext'>{activity.details}</div>
          )}
        </div>
        <div className='activity-time'>{activity.time}</div>
      </div>
    </div>
  );
}

export default ActivityItem;
