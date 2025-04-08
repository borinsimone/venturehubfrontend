import { Outlet, NavLink } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const MainLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className='app-container'>
      <header className='app-header'>
        <div className='logo'>
          <NavLink to='/'>VentureHub</NavLink>
        </div>
        <nav className='main-nav'>
          <NavLink
            to='/dashboard'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            My Trips
          </NavLink>
          <div className='user-menu'>
            <NavLink to='/profile'>
              <FaUser /> Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className='logout-btn'
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </nav>
      </header>

      <main className='main-content'>
        <Outlet />
      </main>

      <footer className='app-footer'>
        <p>© 2025 VentureHub - Plan your adventures together</p>
      </footer>
    </div>
  );
};

export default MainLayout;
