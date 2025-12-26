export function getAQICategory(aqi) {
  if (aqi <= 50) return { text: "Good", color: "bg-green-500", msg: "Air quality is excellent." };
  if (aqi <= 100) return { text: "Fair", color: "bg-lime-500", msg: "Air quality is acceptable." };
  if (aqi <= 200) return { text: "Moderate", color: "bg-yellow-500", msg: "Sensitive people should be cautious." };
  if (aqi <= 300) return { text: "Poor", color: "bg-orange-500", msg: "Health effects may occur." };
  if (aqi <= 400) return "Very Poor";
  return { text: "Danger", color: "bg-gray-500", msg: "Stay at Home" };
}
