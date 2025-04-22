import { useState, useEffect } from 'react';
import { Activity } from '../types';
import ActivityItem from './ActivityItem';

interface ActivityTimelineProps {
  activities: Activity[];
  dayIndex: number;
  onActivityUpdate: (activity: Activity, dayIndex: number) => void;
  onActivityDelete: (activityId: string, dayIndex: number) => void;
  onActivityComplete: (activityId: string, dayIndex: number) => void;
}

function ActivityTimeline({
  activities,
  dayIndex,
  onActivityUpdate,
  onActivityDelete,
  onActivityComplete,
}: ActivityTimelineProps) {
  const [items, setItems] = useState<Activity[]>([]);
  const [nextActivityId, setNextActivityId] = useState<string | null>(null);

  // Update items when activities change
  useEffect(() => {
    if (Array.isArray(activities)) {
      // Sort activities by time
      const sortedActivities = [...activities].sort((a, b) => {
        return (
          timeToMinutes(a.time || '0:00') - timeToMinutes(b.time || '0:00')
        );
      });

      setItems(sortedActivities);
      // Determine current activity when activities change
      findCurrentActivity(sortedActivities);
    } else {
      setItems([]);
    }
  }, [activities]);

  // Convert time string to minutes for easier comparison
  const timeToMinutes = (timeString: string): number => {
    if (!timeString) return 0;

    // Handle different time formats
    let hours = 0;
    let minutes = 0;

    // Try to parse common formats
    if (timeString.includes(':')) {
      const timeParts = timeString.split(':');
      hours = parseInt(timeParts[0], 10) || 0;
      // Extract minutes, handling cases with AM/PM
      const minutesPart = timeParts[1].split(/\s|AM|PM/)[0];
      minutes = parseInt(minutesPart, 10) || 0;
    } else {
      // If no colon, try to interpret as raw hours
      hours = parseInt(timeString, 10) || 0;
    }

    // Handle AM/PM
    if (timeString.toUpperCase().includes('PM') && hours < 12) {
      hours += 12;
    } else if (timeString.toUpperCase().includes('AM') && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Find the activity right after the last completed one
  const findCurrentActivity = (activityList: Activity[]) => {
    if (!activityList || activityList.length === 0) {
      setNextActivityId(null);
      return;
    }

    // Get all completed activities
    const completedActivities = activityList.filter((a) => a.completed);

    // If no completed activities, first one is current
    if (completedActivities.length === 0) {
      setNextActivityId(activityList[0].id);
      return;
    }

    // If all activities are completed, none is current
    if (completedActivities.length === activityList.length) {
      setNextActivityId(null);
      return;
    }

    // Find the index of the last completed activity in the sorted list
    let lastCompletedIndex = -1;
    for (let i = activityList.length - 1; i >= 0; i--) {
      if (activityList[i].completed) {
        lastCompletedIndex = i;
        break;
      }
    }

    // Set the activity right after the last completed one as current
    if (lastCompletedIndex < activityList.length - 1) {
      setNextActivityId(activityList[lastCompletedIndex + 1].id);
    } else {
      // All activities are completed or something went wrong
      setNextActivityId(null);
    }
  };

  // Handle activity completion
  const handleToggleComplete = (activityId: string) => {
    // Call the parent component's completion handler
    onActivityComplete(activityId, dayIndex);

    // Create a new array with the completed activity marked as completed
    const updatedActivities = items.map((item) =>
      item.id === activityId ? { ...item, completed: true } : item
    );

    // Find the next activity immediately to update UI
    findCurrentActivity(updatedActivities);

    // Also update local items array to match the state change
    setItems(updatedActivities);
  };

  // Rendering empty state
  if (!items || items.length === 0) {
    return (
      <div className='day-activities'>
        <div className='timeline'>
          <p className='empty-day-message'>
            Nessuna attività per questo giorno
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='day-activities'>
      <div className='timeline'>
        {items.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isCurrent={activity.id === nextActivityId}
            onToggleComplete={handleToggleComplete}
            onDelete={
              onActivityDelete
                ? (id) => onActivityDelete(id, dayIndex)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
