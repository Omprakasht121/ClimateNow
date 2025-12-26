const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4/search";

export const getWeatherNews = async () => {
  try {
    const response = await fetch(
    `${BASE_URL}?q=weather OR climate OR pollution OR air quality&lang=en&country=in&max=10&apikey=${API_KEY}`
  );


  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  console.log(data)
  return data;
  } catch (error) {
    console.log(error)
  }
};
