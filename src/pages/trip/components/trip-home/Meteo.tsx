import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/GlobalContext';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiWindy,
  WiHumidity,
  WiSunrise,
  WiStrongWind,
  WiDust,
  WiNightClear,
  WiNightAltCloudy,
} from 'react-icons/wi';
import './Meteo.scss';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
}

function Meteo() {
  const { activeTrip } = useGlobalContext();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // API key would typically be stored in environment variables
        const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key or use .env

        // Using the city name from the active trip
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            activeTrip.destination.split(',')[0]
          }&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Unable to load weather data');

        // Setting mock data for demo purposes
        setWeatherData({
          main: { temp: 22, humidity: 65 },
          weather: [
            { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
          ],
          wind: { speed: 3.5 },
          sys: {
            sunrise: Date.now() / 1000 - 3600,
            sunset: Date.now() / 1000 + 7200,
          },
          name: activeTrip.destination.split(',')[0],
        });
      } finally {
        setLoading(false);
      }
    };

    if (activeTrip && activeTrip.destination) {
      fetchWeatherData();
    }
  }, [activeTrip]);

  const getWeatherIcon = (weatherId: number, isDay: boolean) => {
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm />;
    if (weatherId >= 300 && weatherId < 600) return <WiRain />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow />;
    if (weatherId >= 700 && weatherId < 800) return <WiDust />;
    if (weatherId === 800) return isDay ? <WiDaySunny /> : <WiNightClear />;
    if (weatherId > 800) return isDay ? <WiCloudy /> : <WiNightAltCloudy />;
    return <WiDaySunny />;
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className='overview-card weather-card loading'>
        <h2>Meteo</h2>
        <div className='weather-loading'>Caricamento...</div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className='overview-card weather-card error'>
        <div className='weather-error'>
          {error || 'Impossibile caricare i dati meteo'}
        </div>
      </div>
    );
  }

  // Check if it's daytime
  const now = Date.now() / 1000;
  const isDay = now > weatherData.sys.sunrise && now < weatherData.sys.sunset;

  return (
    <div className='overview-card weather-card'>
      <h2>Meteo a {weatherData.name}</h2>

      <div className='weather-main'>
        <div className='weather-icon'>
          {getWeatherIcon(weatherData.weather[0].id, isDay)}
        </div>
        <div className='weather-temp'>
          {Math.round(weatherData.main.temp)}°C
        </div>
        <div className='weather-desc'>
          {weatherData.weather[0].description.charAt(0).toUpperCase() +
            weatherData.weather[0].description.slice(1)}
        </div>
      </div>

      <div className='weather-details'>
        <div className='weather-detail-item'>
          <WiSunrise className='detail-icon' />
          <span className='detail-label'>Alba</span>
          <span className='detail-value'>
            {formatTime(weatherData.sys.sunrise)}
          </span>
        </div>

        <div className='weather-detail-item'>
          <WiStrongWind className='detail-icon' />
          <span className='detail-label'>Vento</span>
          <span className='detail-value'>
            {Math.round(weatherData.wind.speed)} km/h
          </span>
        </div>

        <div className='weather-detail-item'>
          <WiHumidity className='detail-icon' />
          <span className='detail-label'>Umidità</span>
          <span className='detail-value'>{weatherData.main.humidity}%</span>
        </div>
      </div>
    </div>
  );
}

export default Meteo;
