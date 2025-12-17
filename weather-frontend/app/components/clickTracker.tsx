'use client';

type ClickData = {
  lat: number;
  lon: number;
};
type ClickTrackerProps = {
  clicks: ClickData[];
  onSelectClick: (lat: number, lon: number) => void;
};

export default function ClickTracker({ clicks, onSelectClick }: ClickTrackerProps) {
  return (
    <div className="p-4 border rounded max-h-60 overflow-y-auto">
      <h2 className="font-bold mb-2">Clicked Coordinates</h2>
      {clicks.length === 0 ? (
        <p>No clicks yet</p>
      ) : (
        <ul className="text-sm space-y-1">
          {clicks.map((c, i) => (
            <li key={i}>
              <button
                onClick={() => onSelectClick(c.lat, c.lon)} // <-- callback
                className="text-blue-600 hover:underline"
              >
                {i + 1}. Lat: {c.lat.toFixed(4)}, Lon: {c.lon.toFixed(4)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
