Weather & Air Quality Map App
Description

This project is a fullstack web application that allows users to click on a world map and view current weather, air quality, and satellite radiation data for the selected location.

The backend is built with NestJS and fetches data from Open-Meteo APIs. The frontend is built with Next.js and React, displaying interactive maps and weather cards.

Features

Interactive world map for selecting locations

Display of current weather: temperature, wind speed, wind direction

Display of air quality: AQI, PM2.5, PM10, CO, NO₂, O₃

Dynamic weather cards for each selected location

Click history: revisit previously selected locations

Responsive layout with clean UI

Tech Stack

Backend:

NestJS

Axios (for API calls)

RxJS

Frontend:

Next.js (React)

Leaflet (for interactive maps)

TypeScript

Tailwind CSS / External CSS

APIs Used:

Open-Meteo Weather API

Open-Meteo Air Quality API

Satellite Radiation API

Installation

Clone the repository:

git clone https://github.com/<your-username>/weather-map-app.git
cd weather-map-app


Install backend dependencies:

cd weather-api
npm install


Install frontend dependencies:

cd ../frontend
npm install

Running the App
Backend
cd weather-api
npm run start:dev


The backend will run on http://localhost:3000 (default NestJS port).

Frontend
cd frontend
npm run dev


The frontend will run on http://localhost:3001 (or your Next.js port).

Usage

Open the frontend in your browser.

Click on any point on the world map.

View weather and air quality data for the selected location.

Click saved coordinates to fetch the data again.

Folder Structure
weather-map-app/
├─ weather-api/       # NestJS backend
├─ frontend/          # Next.js frontend
└─ README.md

Future Improvements

Add satellite radiation data cards

Dynamic AQI color coding (green to red scale)

Map markers for all previously selected locations

Deploy to Vercel / Heroku for production

License

MIT License
