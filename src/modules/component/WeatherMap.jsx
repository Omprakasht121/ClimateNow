import { MapContainer, TileLayer } from "react-leaflet";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherMap = ({ lat, lon, layer }) => {
   
  return (
    <MapContainer
       center={[lat, lon]}
      zoom={4}
      scrollWheelZoom={false}    
    doubleClickZoom={false}     
    touchZoom={true}
    dragging={true}
    
      className="rounded-2xl overflow-hidden h-[55vh] md:h[110vh] w-100%"
      
    >
      {/* Base map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Weather / AQI overlay */}
      <TileLayer
        url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        opacity={0.7}
        zIndex={50}
      />
    </MapContainer>
  );
};

export default WeatherMap;
