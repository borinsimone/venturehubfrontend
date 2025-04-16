import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './main.css';
import { ReactNode, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Public Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Pages

// import Profile from './pages/user/Profile';
// import TripDashboard from './pages/trip/TripDashboard';
import CreateTrip from './pages/trip/CreateTrip';
import Dashboard from './pages/user/Dashboard';
import { GlobalProvider } from './context/GlobalContext';
import TripDashboard from './pages/trip/TripDashboard';
import TripAgenda from './pages/trip/components/trip-agenda/TripAgenda';
import TripBudget from './pages/trip/components/trip-budget/TripBudget';

// ProtectedRoute component with TypeScript
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            {/* Public home route */}
            <Route
              path='/'
              element={<Home />}
            />

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/register'
                element={<Register />}
              />
            </Route>

            {/* Protected routes */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Dashboard />}
              />
              {/* <Route
              path='profile'
              element={<Profile />}
            /> */}
              <Route
                path='trip/new'
                element={<CreateTrip />}
              />
              <Route
                path='trip/:tripId'
                element={<TripDashboard />}
              />
              <Route
                path='trip/:tripId/agenda'
                element={<TripAgenda />}
              />
              <Route
                path='trip/:tripId/budget'
                element={<TripBudget />}
              />
            </Route>

            {/* Catch all - 404 */}
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  );
}

// NotFound component
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for doesn't exist.</p>
    <a href='/'>Go Home</a>
  </div>
);

export default App;
