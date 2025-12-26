import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("geolocation not supported by browser");
      setLoading(false);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  };

  // 👇 keep your existing auto-detect behavior
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 👇 JUST ADD THIS
  return { location, loading, error, getCurrentLocation };
};

export default useGeolocation;
