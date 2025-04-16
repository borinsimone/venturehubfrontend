import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import TripNavbar from './TripNavbar';
import GlobalContext from '../../context/GlobalContext';
import './trip.scss';
import {
  FaCalendarAlt,
  FaUsers,
  FaCheck,
  FaList,
  FaCheckCircle,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaWalking,
  FaLandmark,
  FaMapMarked,
  FaShoppingBag,
  FaUmbrellaBeach,
  FaTree,
  FaCoffee,
  FaSubway,
  FaBiking,
  FaHome,
  FaBuilding,
  FaArchway,
  FaUniversity,
  FaBus,
  FaCar,
  FaTrain,
  FaShip,
} from 'react-icons/fa';
import TripHome from './components/trip-home/TripHome';
import { getTripById, dummyTrips } from '../../data/tripDummy';
import LoadingTrip from './LoadingTrip';

// Update the TripDetails type to match the data from Next.tsx
type Activity = {
  name?: string;
  icon?: string;
  time: string;
  description?: string;
  type: string;
  completed?: boolean;

  // Additional fields from Home.tsx
  id?: string;
  title?: string;
  details?: string;
  from?: string;
  to?: string;
  location?: string;
};

type Day = {
  day: string | number;
  date?: string;
  activities: Activity[];
};

type Todo = {
  text: string;
  checked: boolean;
};

type TripDetails = {
  id: string;
  destination: string;
  image: string;
  date: string;
  todos?: Todo[];
  days?: Day[];
  title?: string;
  startDate?: string;
  endDate?: string;
  participants?: string[];
};

const TripDashboard = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const { activeTrip } = useContext(GlobalContext);
  // State to track expanded activities
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  useEffect(() => {
    // If we have an activeTrip from context, use that data
    if (activeTrip && activeTrip.id === tripId) {
      setTrip(activeTrip);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }

    // Otherwise fetch trip details from dummy data
    if (tripId) {
      const dummyTrip = getTripById(tripId) || dummyTrips[0];
      if (dummyTrip) {
        setTrip(dummyTrip);
      }
    }
    setLoading(false);
  }, [tripId, activeTrip]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset expanded activity when changing tabs
    setExpandedActivity(null);
  };

  // Helper function to check if an activity is current (happening now)
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

  // Function to toggle activity expansion
  const toggleActivityExpansion = (activityId: string) => {
    if (expandedActivity === activityId) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(activityId);
    }
  };

  // Function to mark activity as completed
  const markActivityCompleted = (dayIndex: number, activityIndex: number) => {
    if (trip && trip.days) {
      const updatedDays = [...trip.days];
      updatedDays[dayIndex].activities[activityIndex].completed = true;

      setTrip({
        ...trip,
        days: updatedDays,
      });
    }
  };

  // Function to render the appropriate icon for an activity
  const renderActivityIcon = (activity: Activity) => {
    // Use icon property if available, or fallback to activity type
    const iconType = activity.icon || activity.type || '';

    switch (iconType.toLowerCase()) {
      case 'plane':
      case 'trasporto':
        return <FaPlane />;
      case 'hotel':
      case 'alloggio':
        return <FaHotel />;
      case 'food':
      case 'ristorazione':
        return <FaUtensils />;
      case 'walk':
      case 'escursione':
        return <FaWalking />;
      case 'monument':
      case 'cultura':
        return <FaLandmark />;
      case 'museum':
        return <FaUniversity />;
      case 'park':
      case 'natura':
        return <FaTree />;
      case 'beach':
      case 'relax':
        return <FaUmbrellaBeach />;
      case 'shopping':
        return <FaShoppingBag />;
      case 'city':
        return <FaBuilding />;
      case 'castle':
        return <FaArchway />;
      case 'church':
        return <FaBuilding />;
      case 'train':
        return <FaTrain />;
      case 'bus':
        return <FaBus />;
      case 'car':
        return <FaCar />;
      case 'boat':
        return <FaShip />;
      case 'tempo libero':
        return <FaCoffee />;
      default:
        return <FaMapMarked />; // Default icon
    }
  };

  if (loading) {
    return <LoadingTrip />;
  }

  if (!trip) {
    return <div className='error'>Trip not found</div>;
  }

  // Count completed todos
  const completedTodos = trip.todos?.filter((todo) => todo.checked).length || 0;
  const totalTodos = trip.todos?.length || 0;

  // Count activities
  const totalActivities =
    trip.days?.reduce((acc, day) => acc + day.activities.length, 0) || 0;

  return (
    <div className='trip-dashboard'>
      <div className='trip-header'>
        <div
          className='trip-header-image'
          style={{
            backgroundImage: `url(${activeTrip?.image || trip?.image})`,
          }}
        >
          <div className='trip-header-overlay'>
            <h1>{activeTrip?.destination || trip?.destination}</h1>
            <p className='trip-date'>
              <FaCalendarAlt /> {activeTrip?.date || trip?.date}
            </p>
          </div>
        </div>

        <div className='trip-header-stats'>
          <div className='stat-item'>
            <FaUsers className='stat-icon' />
            <div className='stat-text'>
              <span className='stat-value'>
                {(activeTrip?.participants || trip?.participants || []).length}
              </span>
              <span className='stat-label'>Travelers</span>
            </div>
          </div>

          <div className='stat-item'>
            <FaCheck className='stat-icon' />
            <div className='stat-text'>
              <span className='stat-value'>
                {completedTodos}/{totalTodos}
              </span>
              <span className='stat-label'>To-dos</span>
            </div>
          </div>

          <div className='stat-item'>
            <FaList className='stat-icon' />
            <div className='stat-text'>
              <span className='stat-value'>{totalActivities}</span>
              <span className='stat-label'>Activities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Render different content based on active tab */}
      <div className='trip-content'>
        {activeTab === 'home' && <TripHome activeTrip={trip} />}
        {activeTab === 'agenda' && (
          <div className='trip-tab-content agenda-tab'>
            <h2>Agenda</h2>
            {trip.days &&
              trip.days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className='agenda-day'
                >
                  <h3 className='day-title'>
                    Day {day.day} - {day.date}
                  </h3>
                  <div className='day-activities'>
                    {day.activities.map((activity, activityIndex) => {
                      const activityName = activity.name || activity.title;
                      const activityDesc =
                        activity.description || activity.details;
                      const isPast = activity.completed;
                      const isCurrent =
                        !activity.completed && isCurrentActivity(activity.time);
                      const isExpanded =
                        expandedActivity === `${dayIndex}-${activityIndex}`;

                      return (
                        <div
                          key={activityIndex}
                          className={`activity-item ${
                            isPast ? 'past-activity' : ''
                          } ${isCurrent ? 'current-activity' : ''} ${
                            isExpanded ? 'expanded' : ''
                          }`}
                          onClick={() =>
                            toggleActivityExpansion(
                              `${dayIndex}-${activityIndex}`
                            )
                          }
                        >
                          <div className='activity-time'>{activity.time}</div>
                          <div className='activity-content'>
                            <div className='activity-header'>
                              <div className='activity-title'>
                                <span className='activity-icon'>
                                  {renderActivityIcon(activity)}
                                </span>
                                <h4>{activityName}</h4>
                              </div>
                              <div className='activity-indicators'>
                                {isPast && (
                                  <span className='completed-indicator'>
                                    <FaCheckCircle />
                                  </span>
                                )}
                                {isCurrent && (
                                  <span className='current-indicator'>
                                    <FaClock />
                                  </span>
                                )}
                                <span className='expand-indicator'>
                                  {isExpanded ? (
                                    <FaChevronUp />
                                  ) : (
                                    <FaChevronDown />
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className='activity-type'>{activity.type}</div>
                            {isCurrent && (
                              <div className='current-badge'>NOW</div>
                            )}

                            {/* ...existing code for expanded content... */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            {/* ...existing code... */}
          </div>
        )}
      </div>

      <TripNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default TripDashboard;
