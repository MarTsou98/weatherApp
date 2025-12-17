'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { getWeather } from '@/services/weather.service';
import ClickTracker from '../components/clickTracker';
import WeatherCard from '../components/weatherCard';
import './page.css';
const WorldMap = dynamic(() => import('../components/WorldMap'), { ssr: false });

type ClickData = { lat: number; lon: number };

export default function Home() {
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);

  async function fetchWeather(lat: number, lon: number) {
    setLat(lat);
    setLon(lon);
    const data = await getWeather(lat, lon);
    setResult(data);
  }

  async function handleMapClick(lat: number, lon: number) {
    setClicks(prev => [...prev, { lat, lon }]);
    await fetchWeather(lat, lon);
  }

 async function handleSavedClick(lat: number, lon: number) {
  const data = await getWeather(lat, lon); // fetch API
  setLat(lat);
  setLon(lon);
  setResult(data);
}

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">World Weather Map</h1>
<div className="map-and-card">
  <WorldMap onSelect={handleMapClick} />
  {result?.waaaatherWithAirQuality && (
    <WeatherCard data={result.waaaatherWithAirQuality} />
  )}
</div>


      <ClickTracker clicks={clicks} onSelectClick={handleSavedClick} />

      {lat !== null && lon !== null && (
        <div className="p-4 border rounded">
          <p><strong>Latitude:</strong> {lat.toFixed(4)}</p>
          <p><strong>Longitude:</strong> {lon.toFixed(4)}</p>
        </div>
      )}

  

    </main>
  );
}
