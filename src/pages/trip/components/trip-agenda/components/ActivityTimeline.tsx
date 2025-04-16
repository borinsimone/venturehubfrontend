import { Activity } from '../types';
import ActivityItem from './ActivityItem';

interface ActivityTimelineProps {
  activities: Activity[];
}

function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const isCurrentActivity = (time: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Convert time string (e.g., "8:30 AM") to 24-hour format
    const timeParts = time.split(' ');
    const [hours, minutes] = timeParts[0].split(':').map(Number);
    const isPM = timeParts[1] === 'PM' && hours < 12;
    const is12AM = timeParts[1] === 'AM' && hours === 12;

    // Convert to 24-hour time
    let hour24 = is12AM ? 0 : isPM ? hours + 12 : hours;

    // Activity is current if it's within 30 minutes of the current time
    const activityTimeInMinutes = hour24 * 60 + minutes;
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
    const timeDifference = Math.abs(
      activityTimeInMinutes - currentTimeInMinutes
    );

    return timeDifference <= 30;
  };

  return (
    <div className='day-activities'>
      <div className='timeline'>
        {activities.map((activity) => {
          const isCurrent =
            !activity.completed && isCurrentActivity(activity.time);
          return (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isCurrent={isCurrent}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ActivityTimeline;
