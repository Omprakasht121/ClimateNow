import { breakpoints } from "../utils/indianAQI";

export function calculateIndianAQI(components) {
  const aqiValues = [];

  aqiValues.push(getAQIForPollutant(components.pm2_5, "pm2_5"));
  aqiValues.push(getAQIForPollutant(components.pm10, "pm10"));
  aqiValues.push(getAQIForPollutant(components.no2, "no2"));
  aqiValues.push(getAQIForPollutant(components.so2, "so2"));
  aqiValues.push(getAQIForPollutant(components.o3, "o3"));
  aqiValues.push(getAQIForPollutant(components.co, "co"));

  return Math.max(...aqiValues.filter(v => v !== null));
}


function calculateSubIndex(C, bp) {
  const { lo, hi, aqiLo, aqiHi } = bp;
  return Math.round(
    ((aqiHi - aqiLo) / (hi - lo)) * (C - lo) + aqiLo
  );
}

function getAQIForPollutant(value, pollutant) {
  const bps = breakpoints[pollutant];
  if (!bps || value == null) return null;

  const bp = bps.find(b => value >= b.lo && value <= b.hi);
  if (!bp) return null;

  return calculateSubIndex(value, bp);
}
