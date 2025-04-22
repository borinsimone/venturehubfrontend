import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from '../types';
import ActivityItem from './ActivityItem';
import { FaPlus } from 'react-icons/fa';

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

  // Update items when activities change
  useEffect(() => {
    if (Array.isArray(activities)) {
      setItems([...activities]);
    } else {
      setItems([]);
    }
  }, [activities]);

  const getCurrentActivity = () => {
    if (!items || items.length === 0) return null;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinutes;

    // Find incomplete activity closest to current time
    const incompleteActivities = items.filter(
      (activity) => !activity.completed
    );
    if (incompleteActivities.length === 0) return null;

    // Convert activity times to minutes for comparison
    const activitiesWithMinutes = incompleteActivities.map((activity) => {
      const timeString = activity.time || '0:00';
      const timeParts = timeString.split(' ')[0].split(':');
      let hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1] || '0');

      // Handle AM/PM
      if (timeString.includes('PM') && hours < 12) {
        hours += 12;
      } else if (timeString.includes('AM') && hours === 12) {
        hours = 0;
      }

      return {
        ...activity,
        timeInMinutes: hours * 60 + minutes,
      };
    });

    // Sort by closest to current time
    activitiesWithMinutes.sort((a, b) => {
      const diffA = Math.abs(a.timeInMinutes - currentTime);
      const diffB = Math.abs(b.timeInMinutes - currentTime);
      return diffA - diffB;
    });

    return activitiesWithMinutes[0].id;
  };

  const currentActivityId = getCurrentActivity();

  const handleToggleComplete = (activityId: string) => {
    onActivityComplete(activityId, dayIndex);
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
            isCurrent={activity.id === currentActivityId}
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
