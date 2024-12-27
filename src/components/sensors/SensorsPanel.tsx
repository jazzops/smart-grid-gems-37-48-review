import { useState } from "react";
import { SensorCard } from "./SensorCard";
import { CitySelector } from "./CitySelector";
import { sensorsData } from "./SensorsData";

const SensorsPanel = () => {
  const [selectedCity, setSelectedCity] = useState<string>("gdansk"); // Set default city
  const cities = Object.keys(sensorsData).map(key => sensorsData[key].name);
  
  // Get current city's sensor data safely
  const currentCityData = selectedCity ? sensorsData[selectedCity.toLowerCase()] : null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Czujniki</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last synced in an hour</span>
          <span>•</span>
          <span>100% est. battery</span>
          <span>•</span>
          <span>-71 dBm</span>
        </div>
      </div>

      <CitySelector
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
      />

      {currentCityData && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentCityData.sensors.map((sensor, index) => (
            <SensorCard 
              key={index}
              icon={sensor.icon}
              name={sensor.name}
              value={sensor.value}
              unit={sensor.unit}
              status={sensor.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorsPanel;