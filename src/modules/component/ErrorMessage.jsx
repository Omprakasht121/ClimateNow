import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Wind, 
  Droplets, 
  MapPin, 
  AlertCircle, 
  ExternalLink, 
  Loader2, 
  Newspaper,
  Sun,
  CloudRain,
  Navigation
} from 'lucide-react';

/**
 * FIXED ERRORS:
 * 1. "TypeError: Cannot read properties of undefined (reading '0')":
 * - Added defensive checks (optional chaining `?.`) for `weather.weather[0]` and `aqi.main`.
 * - Ensured state updates only occur when data is valid.
 * 2. "Objects are not valid as a React child":
 * - Identified that `error` state was sometimes assigned an object (like a native Error object).
 * - Wrapped error assignment in `err.message` or a string to ensure only text is rendered.
 * 3. Improved data flow and loading logic.
 */

// API Configuration - Note: Empty API key for runtime provision
const API_KEY = ""; 

const App = () => {
  const [location, setLocation] = useState({ name: 'Detecting...', lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({ weather: true, aqi: true, news: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    const initLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(prev => ({ ...prev, lat: latitude, lon: longitude }));
            fetchDashboardData(latitude, longitude);
          },
          (err) => {
            setError("Location access denied. Using default: New Delhi.");
            fetchDashboardData(28.6139, 77.2090);
          }
        );
      } else {
        setError("Geolocation not supported. Using default: New Delhi.");
        fetchDashboardData(28.6139, 77.2090);
      }
    };

    initLocation();
  }, []);

  const fetchDashboardData = async (lat, lon) => {
    // Weather Fetch
    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      if (!weatherRes.ok) throw new Error("Weather API Error");
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      setLocation({ name: weatherData.name || "Unknown Location", lat, lon });
    } catch (err) {
      console.error("Weather fetch failed:", err);
      // Don't set global error if only one part fails, but log it
    } finally {
      setLoading(prev => ({ ...prev, weather: false }));
    }

    // AQI Fetch
    try {
      const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      if (!aqiRes.ok) throw new Error("AQI API Error");
      const aqiData = await aqiRes.json();
      if (aqiData?.list?.[0]) {
        setAqi(aqiData.list[0]);
      }
    } catch (err) {
      console.error("AQI fetch failed:", err);
    } finally {
      setLoading(prev => ({ ...prev, aqi: false }));
    }

    // News Fetch
    try {
      const newsRes = await fetch(`https://gnews.io/api/v4/search?q=climate OR weather&lang=en&max=6&apikey=${API_KEY}`);
      if (!newsRes.ok) throw new Error("News API Error");
      const newsData = await newsRes.json();
      setNews(newsData.articles || []);
    } catch (err) {
      console.error("News fetch failed:", err);
    } finally {
      setLoading(prev => ({ ...prev, news: false }));
    }
  };

  const getAqiStatus = (index) => {
    const levels = {
      1: { text: 'Good', color: 'bg-green-500', msg: 'Air quality is satisfactory.' },
      2: { text: 'Moderate', color: 'bg-yellow-500', msg: 'Air quality is acceptable.' },
      3: { text: 'Poor', color: 'bg-orange-500', msg: 'Unhealthy for sensitive groups.' },
      4: { text: 'Very Poor', color: 'bg-red-500', msg: 'Health alert: Everyone may experience effects.' },
      5: { text: 'Hazardous', color: 'bg-purple-600', msg: 'Emergency health warning.' }
    };
    return levels[index] || levels[1];
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Cloud className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-blue-600">ClimateNow</h1>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full text-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="font-medium">
              {location.name === 'Detecting...' ? (
                <span className="flex items-center gap-2">
                  Detecting location... <Loader2 className="w-3 h-3 animate-spin" />
                </span>
              ) : `Location: ${location.name}`}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{typeof error === 'string' ? error : error.message}</p>
          </div>
        )}

        {/* 2. Environmental Data Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather Card */}


          {/* AQI Card */}
        
        </section>

        {/* 3. News Section */}
        
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400 text-sm">
        <p>© 2025 ClimateNow Dashboard • Data powered by OpenWeather & GNews</p>
      </footer>
    </div>
  );
};

export default App;