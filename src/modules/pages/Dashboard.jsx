import { useEffect, useState } from "react";
import { Search, MapPin, X } from "lucide-react";


import WeatherCard from "../component/WeatherCard";
import AQICard from "../component/AqiCard";
import NewsCard from "../component/NewsCard";
import { getCurrentWeather } from "../services/weatherService";
import useGeolocation from "../hooks/useGeolocation";
import { searchLocation } from "../services/locationService";
import { getAQIData } from "../services/aqiService";
import { getWeatherNews } from "../services/newsService";
import WeatherMap from "../component/WeatherMap";

const Dashboard = () => {
    const {location,  loading: locationLoading, error, getCurrentLocation} = useGeolocation();

    const [selectedLocation, setSelectedLocation] =useState(null);
    const[suggestions, setSuggestion] =useState([]);

    const[weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);

    const[aqiData, setAqiData] = useState(null);
    const[aqiLoading, setAqiLoading] = useState(true);

    const[ newsData, setNewsData] = useState(null);
    const [newsLoading, setNewsLoading] = useState(true);

    
    const [mapLayer, setMapLayer] = useState("air_pollution");



    const[query,setQuery] = useState("");

    const finalLocation = selectedLocation || location;

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // console.log(finalLocation)
    // console.log(query);
    // console.log(suggestions);

    useEffect(()=>{
        if (query.length < 2) {
        setSuggestion([]);
        return;
        }

        const fetchSuggestion =async () =>{
            try{
                const data = await searchLocation(query);
                setSuggestion(data);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchSuggestion();
    },[query])

    // weather data loading 

    useEffect(()=>{
        if (!finalLocation?.lat || !finalLocation?.lon) return;

    setWeatherLoading(true);

    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather(
          finalLocation.lat,
          finalLocation.lon
        );
        setWeatherData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [finalLocation]);


  // aqi data loading 

  useEffect(()=>{

    if(!finalLocation?.lat && !finalLocation?.lon) return;

    const fetchAqi =async () =>{
      try{
        const data = await getAQIData(
          finalLocation.lat,
          finalLocation.lon,
        )
        
        setAqiData(data);
        
        
      }
      catch(error){
        console.log(error);
      }
      finally{
        setAqiLoading(false);
      }
    }
    fetchAqi();

  },[finalLocation])


  // news data loading 
  useEffect(() => {


    const fetchNews = async () =>{
      try{
        const data = await getWeatherNews();
        setNewsData(data);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setNewsLoading(false);
      }
    }
    fetchNews()
  },[])

    if (locationLoading) {
    return <p className="text-center mt-10">Detecting location...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-blue-200/40">
      <div className="container mx-auto p-4">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-2xl">
            Climate<span className="text-red-600">Now</span>
          </h1>

          {/* SEARCH */}
          <div className="relative md:min-w-64">
            <div className="flex items-center justify-center md:bg-white rounded-lg md:border px-2 gap-2">
              <Search onClick={()=> setIsSearchOpen(prev => !prev)} className=" text-gray-800 hover:scale-110 transition-transform duration-300 ease-in-out" />
              <input type="text"
              className="hidden md:flex w-full p-2 px-6 outline-none"
              placeholder="search location"
              value ={query}
              onChange={(e) =>setQuery(e.target.value)}
              />
              <MapPin
              className="hover:scale-110 transition-transform duration-300 ease-in-out"
               onClick={() => {
                        setSelectedLocation(null); // 🔑 THIS IS THE FIX
                        getCurrentLocation();
                    }}/>
            </div>
            {suggestions.length > 0  && (
                <div className="absolute hidden md:flex flex-col z-50 bg-white w-full rounded-lg shadow mt-1">
                    {suggestions.map((place,idx) => (
                        <div
                        key={idx}
                        onClick={() =>{
                            setSelectedLocation({
                                lat:place.lat,
                                lon:place.lon,
                                name:place.name,
                            });
                            setQuery(place.name);
                            setSuggestion([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
                        >
                        {place.name},{place.country}
                        </div>
                    ))}
                </div>
            )}
          </div>
        </header>
        <div className="relative">
              {isSearchOpen && (
          <div className=" w-full flex items-center gap-2 px-4 rounded-lg bg-white border border-gray-300 md:hidden">
            
            <Search className="text-gray-800 hover:scale-110 transition-transform duration-300 ease-in-out" />

            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Search location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <X
              className="text-gray-800 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={() => {
                setIsSearchOpen(false);
                setSuggestion([]);
              }}
              
            />
          </div>
          
        )}

         {suggestions.length > 0  && (
                <div className="absolute flex md:hidden flex-col z-50 bg-white w-full rounded-lg shadow mt-1">
                    {suggestions.map((place,idx) => (
                        <div
                        key={idx}
                        onClick={() =>{
                            setSelectedLocation({
                                lat:place.lat,
                                lon:place.lon,
                                name:place.name,
                            });
                            setQuery(place.name);
                            setSuggestion([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
                        >
                        {place.name},{place.country}
                        </div>
                    ))}
                </div>
            )}
        </div>



        {/* WEATHER + AQI */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="flex flex-col gap-4">
              <WeatherCard weatherData ={weatherData} loading = {weatherLoading}/>
            <AQICard aqiData = {aqiData} loading={aqiLoading}/>
            </div>
            <div>
               <div
                  onClick={() => {
                    setMapLayer(prev => !prev);
                  }}
                  className="cursor-pointer bg-red-600 rounded-3xl p-8 text-white hover:ring-2 hover:ring-blue-400"
                >
                  
                </div>
                { finalLocation && (
                <div className="mt-6">
                  <WeatherMap
                    lat={finalLocation.lat}
                    lon={finalLocation.lon}
                    layer={mapLayer}
                  />
                </div>
              )}
            </div>
        </section>

        {/* NEWS */}
        <section className="py-8">
           <NewsCard newsData = {newsData} loading={newsLoading}/>
        </section>
         
        
      </div>
    </div>
  );
};

export default Dashboard;
