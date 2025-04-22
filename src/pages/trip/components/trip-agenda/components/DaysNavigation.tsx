import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Day } from '../types';

interface DaysNavigationProps {
  days: Day[];
  selectedDay: number;
  onSelectDay: (index: number) => void;
}

function DaysNavigation({
  days,
  selectedDay,
  onSelectDay,
}: DaysNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view when selectedDay changes
  useEffect(() => {
    if (containerRef.current) {
      const activeTab = containerRef.current.children[
        selectedDay
      ] as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [selectedDay]);

  return (
    <motion.div
      className='days-navigation'
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      {days.map((day, index) => (
        <motion.div
          key={index}
          className={`day-tab ${selectedDay === index ? 'active' : ''}`}
          onClick={() => onSelectDay(index)}
          whileTap={{ scale: 0.95 }}
        >
          <div className='day-number'>Giorno {day.day}</div>
          <div className='day-date'>{day.date}</div>
          {selectedDay === index && (
            <motion.div
              className='active-indicator'
              layoutId='activeIndicator'
              transition={{ duration: 0.3 }}
            ></motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default DaysNavigation;
