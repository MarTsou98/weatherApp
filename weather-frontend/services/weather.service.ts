const API_BASE_URL = 'http://localhost:3010/weather';

export async function getWeather(lat: number, lon: number) {
  const response = await fetch(
    `${API_BASE_URL}/combined?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }

  return response.json();
}

export async function getAirQuality(lat: number, lon: number) {
  const response = await fetch(
    `${API_BASE_URL}/air-quality?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch air quality');
  }

  return response.json();
}

export async function getSatelliteRadiation(lat: number, lon: number) {
  const response = await fetch(
    `${API_BASE_URL}/satellite-radiation?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch radiation data');
  }

  return response.json();
}
