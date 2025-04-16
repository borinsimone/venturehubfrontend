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
  return (
    <div className='days-navigation'>
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
