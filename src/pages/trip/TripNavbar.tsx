import { FaHome, FaCalendarAlt, FaMoneyBillWave, FaCog } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import './trip.scss';

const TripNavbar = () => {
  const { tripId } = useParams<{ tripId: string }>();

  return (
    <nav className='trip-navbar'>
      <div className='trip-navbar-container'>
        <NavLink
          to={`/dashboard/trip/${tripId}`}
          end
          className={({ isActive }) =>
            `trip-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FaHome className='trip-nav-icon' />
          <span className='trip-nav-label'>Home</span>
        </NavLink>

        <NavLink
          to={`/dashboard/trip/${tripId}/agenda`}
          className={({ isActive }) =>
            `trip-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FaCalendarAlt className='trip-nav-icon' />
          <span className='trip-nav-label'>Agenda</span>
        </NavLink>

        <NavLink
          to={`/dashboard/trip/${tripId}/budget`}
          className={({ isActive }) =>
            `trip-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FaMoneyBillWave className='trip-nav-icon' />
          <span className='trip-nav-label'>Soldi</span>
        </NavLink>

        <NavLink
          to={`/dashboard/trip/${tripId}/settings`}
          className={({ isActive }) =>
            `trip-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FaCog className='trip-nav-icon' />
          <span className='trip-nav-label'>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default TripNavbar;
