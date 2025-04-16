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

// Update the TripDetails type to match the data from Next.tsx
type Activity = {
  name: string;
  icon: string;
  time: string;
  description: string;
  type: string;
  completed?: boolean;

  // Additional fields from Home.tsx
  id?: string;
  title?: string;
  details?: string;
  from?: string;
  to?: string;
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
      setLoading(false);
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

  // Function to render activity icon based on icon string or type
  const renderActivityIcon = (activity: Activity) => {
    const iconName = activity.icon || '';
    const activityType = activity.type || '';

    switch (iconName.toLowerCase()) {
      case 'plane':
        return <FaPlane />;
      case 'hotel':
        return <FaHotel />;
      case 'food':
        return <FaUtensils />;
      case 'walk':
        return <FaWalking />;
      case 'monument':
        return <FaLandmark />;
      case 'landmark':
        return <FaLandmark />;
      case 'park':
        return <FaTree />;
      case 'shopping':
        return <FaShoppingBag />;
      case 'beach':
        return <FaUmbrellaBeach />;
      case 'museum':
        return <FaUniversity />;
      case 'city':
        return <FaBuilding />;
      case 'castle':
        return <FaArchway />;
      case 'church':
        return <FaBuilding />;
      case 'train':
        return <FaTrain />;
      case 'boat':
        return <FaShip />;
      default:
        // Fallback to type-based icons if icon isn't specified
        switch (activityType.toLowerCase()) {
          case 'trasporto':
            return <FaSubway />;
          case 'alloggio':
            return <FaHome />;
          case 'escursione':
            return <FaMapMarked />;
          case 'ristorazione':
            return <FaUtensils />;
          case 'cultura':
            return <FaUniversity />;
          case 'shopping':
            return <FaShoppingBag />;
          case 'natura':
            return <FaTree />;
          case 'relax':
            return <FaUmbrellaBeach />;
          case 'tempo libero':
            return <FaCoffee />;
          default:
            return <FaMapMarked />; // Default icon
        }
    }
  };

  if (loading) {
    return <div className='loading'>Loading trip details...</div>;
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
      </div>

      <TripNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default TripDashboard;
