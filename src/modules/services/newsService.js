const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

export const getWeatherNews = async () => {
  try {
    const response = await fetch(
    `${BASE_URL}?q=weather OR monsoon OR heatwave OR rainfall OR air quality OR pollution&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`
  );


  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();

  return data;
  } catch (error) {
    console.log(error)
  }
};
