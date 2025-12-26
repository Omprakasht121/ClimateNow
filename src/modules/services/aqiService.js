const BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getAQIData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch AQI data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AQI API Error:", error.message);
    throw error;
  }
};
