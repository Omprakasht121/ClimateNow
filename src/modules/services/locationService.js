const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const searchLocation =async (query) =>{
  if(!query) return;
  try{
     const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  if(!response.ok){
    throw new Error("error to fetch locations")

  }
  const data =await response.json();
  return data
  }
  catch(error){
    console.log("error is: ", error);
  }
}