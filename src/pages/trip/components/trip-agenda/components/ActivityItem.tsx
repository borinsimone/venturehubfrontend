import { useState, useRef } from 'react';
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
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!activity || !activity.id) {
    console.error('Invalid activity object', activity);
    return null;
  }

  const handleClick = () => {
    if (Math.abs(swipeOffset) < 5) {
      // Only expand if not swiping
      setIsExpanded(!isExpanded);
    }
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activity.completed) return; // Don't allow swipe on completed items
    setSwipeStartX(e.touches[0].clientX);
    setShowSwipeHint(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStartX === null || activity.completed) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - swipeStartX;

    // Only allow swipe left (negative values) up to -100px
    if (diff < 0) {
      setSwipeOffset(Math.max(diff, -100));
    }
  };

  const handleTouchEnd = () => {
    if (activity.completed) return;

    setShowSwipeHint(false);

    // If swiped more than 50% of threshold, complete the activity
    if (swipeOffset < -50) {
      // First reset the position with animation
      setSwipeOffset(0);

      // Set a clear visual transition by forcing the completed style briefly
      if (cardRef.current) {
        cardRef.current.classList.add('completing');
      }

      // Then complete the activity after the animation
      setTimeout(() => {
        // Remove transition class if it exists
        if (cardRef.current) {
          cardRef.current.classList.remove('completing');
        }
        onToggleComplete(activity.id);
      }, 300); // Wait for transition to complete (matches the CSS transition time)
    } else {
      // Just reset position if not swiped enough
      setSwipeOffset(0);
    }

    // Reset swipe start state
    setSwipeStartX(null);
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
      <div
        ref={cardRef}
        className={`activity-card ${activity.completed ? 'completed' : ''} ${
          isCurrent ? 'current' : ''
        }`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition:
            swipeOffset !== 0 && swipeStartX === null
              ? 'transform 0.3s ease-out'
              : 'none',
        }}
      >
        {/* Icon */}
        <div className={`activity-icon-container ${activity.type || 'other'}`}>
          <ActivityIcon type={activity.icon || activity.type || 'other'} />
        </div>

        {/* Details */}
        <div className='activity-details'>
          <div className='activity-title'>
            {activity.title || activity.name || 'Untitled Activity'}
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
          {isExpanded && (activity.description || activity.details) && (
            <div className='activity-description'>
              {/* Display description content with paragraph formatting */}
              {(activity.description || activity.details || '')
                .split('\n')
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className={index > 0 ? 'description-paragraph' : ''}
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          )}
        </div>

        {/* Time */}
        <div className='activity-time'>{activity.time || '--:--'}</div>

        {/* Swipe hint indicator */}
        {showSwipeHint && !activity.completed && (
          <div className='swipe-indicator'>Swipe per completare</div>
        )}
      </div>
    </div>
  );
}

export default ActivityItem;
