import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Activity } from '../types';
import ActivityIcon from './ActivityIcon';

interface ActivityItemProps {
  activity: Activity;
  isCurrent: boolean;
  onToggleComplete: (id: string) => void;
  onEdit?: (activity: Activity) => void;
  onDelete?: (id: string) => void;
}

function ActivityItem({
  activity,
  isCurrent,
  onToggleComplete,
  onEdit,
  onDelete,
}: ActivityItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!activity || !activity.id) {
    console.error('Invalid activity object', activity);
    return null;
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    console.log('Activity clicked:', activity);
  };

  const handleSwipe = (info: PanInfo) => {
    // Swipe right = complete activity
    if (info.offset.x > 80) {
      onToggleComplete(activity.id);
    }
    // Swipe left could be used for delete if needed
    else if (info.offset.x < -80 && onDelete) {
      onDelete(activity.id);
    }
  };

  return (
    <div className='timeline-item'>
      {/* Timeline dot */}
      <div
        className={`timeline-dot ${activity.completed ? 'completed' : ''} ${
          isCurrent ? 'current' : ''
        }`}
      ></div>

      {/* Activity card */}
      <motion.div
        className={`activity-card ${activity.completed ? 'completed' : ''} ${
          isCurrent ? 'current' : ''
        }`}
        onClick={handleClick}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => handleSwipe(info)}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -2 }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        layoutId={`activity-${activity.id}`}
      >
        {/* Icon */}
        <div className={`activity-icon-container ${activity.type || 'other'}`}>
          <ActivityIcon type={activity.icon || 'other'} />
        </div>

        {/* Details */}
        <div className='activity-details'>
          <div className='activity-title'>
            {activity.name || 'Untitled Activity'}
          </div>

          {activity.type === 'flight' && (
            <div className='route-info'>
              {activity.from && activity.to && (
                <>
                  <div>da {activity.from}</div>
                  <div>a {activity.to}</div>
                </>
              )}
            </div>
          )}

          {activity.subtitle && (
            <div className='activity-subtitle'>{activity.subtitle}</div>
          )}

          {/* Location or subtitle */}
          {!activity.subtitle && activity.location && (
            <div className='activity-subtitle'>{activity.location}</div>
          )}

          {/* Expanded description */}
          {isExpanded && activity.description && (
            <motion.div
              className='activity-description'
              initial={{
                height: 0,
                opacity: 0,
                scale: 0.95,
                y: -10,
                transformOrigin: 'top',
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  height: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2, delay: 0.1 },
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                scale: 0.95,
                y: -10,
                transition: {
                  height: { duration: 0.2 },
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.15 },
                },
              }}
            >
              {/* Display description content with paragraph formatting */}
              {activity.description.split('\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.05 * index },
                  }}
                  className={index > 0 ? 'description-paragraph' : ''}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          )}
        </div>

        {/* Time */}
        <div className='activity-time'>{activity.time || '--:--'}</div>
      </motion.div>
    </div>
  );
}

export default ActivityItem;
