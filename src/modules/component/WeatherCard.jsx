import { Droplets, Wind, AlertCircle, Loader2, Sunrise, SunsetIcon, Sunset, LucideSunset } from "lucide-react";

const WeatherCard = ({weatherData,loading}) => {
  if(loading){
    return(
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    )
  }
  const formatToIST = (unixSeconds) => {
  return new Date(unixSeconds * 1000).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const sunriseIST = formatToIST(weatherData.sys.sunrise);
const sunsetIST = formatToIST(weatherData.sys.sunset);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-8 text-white shadow-xl min-h-[300px] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{weatherData.name}</h2>
              <p className="capitalize opacity-90">
                 {weatherData.weather?.[0]?.description}
              </p>
            </div>

            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt="weather"
              className="w-24 h-24"
            />
          </div>

          <div className="text-7xl font-light flex justify-between">
            <div>
              {Math.round(weatherData.main.temp)}°
            <span className="text-4xl">C</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center gap-2">
                <Sunrise/>
                <p className="text-xl">{sunriseIST}</p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <Sunset/>
                <p className="text-xl">{sunsetIST}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5" />
              <div>
                <p className="text-xs">Humidity</p>
                
                <p className="font-semibold">{weatherData.main.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5" />
              <div>
                <p className="text-xs">Wind</p>
                <p className="font-semibold">{weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </div>
    </div>
  );
};

export default WeatherCard;
