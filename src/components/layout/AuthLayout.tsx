import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <Link
          to='/'
          className='auth-logo'
        >
          VentureHub
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
