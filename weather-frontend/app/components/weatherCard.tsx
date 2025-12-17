'use client';

import './weatherCard.css';

type WeatherWithAirQuality = {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    time: string;
  };
  airQuality: {
    aqi: number;
    pm10: number;
    pm2_5: number;
    carbonMonoxide: number;
    nitrogenDioxide: number;
    ozone: number;
    time: string;
  };
};

type WeatherCardProps = {
  data: WeatherWithAirQuality;
};

export default function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2>Weather & Air Quality</h2>

      <div className="section weather-section">
        <h3>Weather</h3>
        <p>Temperature: {data.current_weather.temperature}°C</p>
        <p>Wind Speed: {data.current_weather.windspeed} km/h</p>
        <p>Wind Direction: {data.current_weather.winddirection}°</p>
        <p>Time: {data.current_weather.time}</p>
      </div>

      <div className="section air-quality-section">
        <h3>Air Quality</h3>
        <p>AQI: {data.airQuality.aqi}</p>
        <p>PM10: {data.airQuality.pm10}</p>
        <p>PM2.5: {data.airQuality.pm2_5}</p>
        <p>CO: {data.airQuality.carbonMonoxide}</p>
        <p>NO₂: {data.airQuality.nitrogenDioxide}</p>
        <p>O₃: {data.airQuality.ozone}</p>
        <p>Time: {data.airQuality.time}</p>
      </div>
    </div>
  );
}
