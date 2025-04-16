import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
interface GlobalContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  activeTrip: any | null; // Update to correct type later
  setActiveTrip: (trip: any) => void; // Update to correct type later
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Create the context with default values
const GlobalContext = createContext<GlobalContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  theme: 'light',
  toggleTheme: () => {},
  loading: false,
  setLoading: () => {},
  activeTrip: null,
  setActiveTrip: () => {},
});

// Provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        theme,
        toggleTheme,
        loading,
        setLoading,
        activeTrip,
        setActiveTrip,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for using the context
export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
