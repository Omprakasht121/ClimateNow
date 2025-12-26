const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async (lat, lon) => {
    try{
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if(!response.ok){
            throw new Error("Failed to fetch weather data");
        }
        const data =response.json();
        return data;
    }
    catch(error){
        console.log("the error is: ", error);
    };
    
};




// const response = await fetch(
//       `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//     );