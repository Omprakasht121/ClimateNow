const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
// const BASE_URL = "https://gnews.io/api/v4/search";
const BASE_URL = "https://content.guardianapis.com/search";

export const getWeatherNews = async () => {
  try {
    const response = await fetch(
    `${BASE_URL}?q=weather%20OR%20climate%20OR%20pollution&show-fields=thumbnail,trailText&order-by=newest&api-key=${API_KEY}`
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
