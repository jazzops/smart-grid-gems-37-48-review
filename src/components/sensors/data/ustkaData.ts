
import { CityData } from "../types/SensorDataTypes";
import { sensorDescriptions } from "../constants/sensorDescriptions";

export const ustkaData: CityData = {
  name: "Ustka",
  coordinates: {
    lat: 54.352,
    lon: 18.6466
  },
  sensors: [
    {
      iconType: "temperature",
      name: "Temp",
      value: "0",
      unit: "°C",
      status: "Good",
      description: sensorDescriptions.temp,
    },
    {
      iconType: "co2",
      name: "CO₂",
      value: "475",
      unit: "ppm",
      status: "Good",
      description: sensorDescriptions.co2,
    },
    {
      iconType: "voc",
      name: "VOC",
      value: "44",
      unit: "ppb",
      status: "Good",
      description: sensorDescriptions.voc,
    },
    {
      iconType: "pm25",
      name: "PM 2.5",
      value: "9",
      unit: "µg/m³",
      status: "Good",
      description: sensorDescriptions.pm25,
    },
    {
      iconType: "pm10",
      name: "PM10",
      value: "12",
      unit: "µg/m³",
      status: "Good",
      description: sensorDescriptions.pm10,
    },
    {
      iconType: "humidity",
      name: "Humidity",
      value: "58",
      unit: "%",
      status: "Good",
      description: sensorDescriptions.humidity,
    },
    {
      iconType: "noise",
      name: "Noise",
      value: "42",
      unit: "dBA",
      status: "Good",
      description: sensorDescriptions.noise,
    },
    {
      iconType: "pressure",
      name: "Pressure",
      value: "1011",
      unit: "hPa",
      status: "Good",
      description: sensorDescriptions.pressure,
    },
    {
      iconType: "light",
      name: "Light",
      value: "65",
      unit: "%",
      status: "Good",
      description: sensorDescriptions.light,
    },
  ],
};
