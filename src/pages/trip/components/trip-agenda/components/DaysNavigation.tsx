import React, { useRef, useEffect } from 'react';
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
    <div
      className='days-navigation'
      ref={containerRef}
    >
      {days.map((day, index) => (
        <div
          key={index}
          className={`day-tab ${selectedDay === index ? 'active' : ''}`}
          onClick={() => onSelectDay(index)}
        >
          <div className='day-number'>Giorno {day.day}</div>
          <div className='day-date'>{day.date}</div>
          {selectedDay === index && <div className='active-indicator'></div>}
        </div>
      ))}
    </div>
  );
}

export default DaysNavigation;
