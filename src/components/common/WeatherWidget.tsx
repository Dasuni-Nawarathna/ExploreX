import React from "react";
import { Sun, CloudSun, CloudRain, Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherWidgetProps {
  destinationName: string;
  region: string;
}

export function WeatherWidget({ destinationName, region }: WeatherWidgetProps) {
  // Realistic regional climate data based on Sri Lanka's microclimates
  const getWeatherData = () => {
    const reg = region.toLowerCase();
    const name = destinationName.toLowerCase();

    if (reg.includes("highlands") || name.includes("nuwara eliya") || name.includes("ella")) {
      return {
        tempC: 18,
        tempF: 64,
        condition: "Misty & Refreshing",
        humidity: "75%",
        windSpeed: "12 km/h",
        icon: CloudSun,
        accent: "text-blue-600 bg-blue-50 border-blue-200",
        seasonNote: "Cool mountain climate. Light fleece or shawl recommended for evenings.",
      };
    }

    if (reg.includes("cultural") || name.includes("sigiriya") || name.includes("dambulla")) {
      return {
        tempC: 30,
        tempF: 86,
        condition: "Sunny & Warm",
        humidity: "62%",
        windSpeed: "14 km/h",
        icon: Sun,
        accent: "text-amber-600 bg-amber-50 border-amber-200",
        seasonNote: "Ideal for morning rock fortress climbs and afternoon elephant safaris.",
      };
    }

    if (reg.includes("southern") || name.includes("mirissa") || name.includes("galle")) {
      return {
        tempC: 29,
        tempF: 84,
        condition: "Tropical Ocean Breeze",
        humidity: "78%",
        windSpeed: "18 km/h",
        icon: Sun,
        accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
        seasonNote: "Prime turquoise ocean swimming and whale watching conditions.",
      };
    }

    if (reg.includes("wildlife") || name.includes("yala")) {
      return {
        tempC: 31,
        tempF: 88,
        condition: "Dry Savannah Sun",
        humidity: "65%",
        windSpeed: "15 km/h",
        icon: Sun,
        accent: "text-amber-700 bg-amber-50 border-amber-200",
        seasonNote: "Excellent game drive visibility around watering holes at dawn & dusk.",
      };
    }

    // Default tropical coastal
    return {
      tempC: 29,
      tempF: 84,
      condition: "Tropical Warmth",
      humidity: "72%",
      windSpeed: "15 km/h",
      icon: CloudSun,
      accent: "text-teal-700 bg-teal-50 border-teal-200",
      seasonNote: "Warm tropical island weather with gentle afternoon coastal breezes.",
    };
  };

  const weather = getWeatherData();
  const Icon = weather.icon;

  return (
    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${weather.accent} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Current Climate & Forecast
            </span>
            <h4 className="font-bold text-stone-900 text-sm">{weather.condition}</h4>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-stone-900 leading-none block">
            {weather.tempC}°C
          </span>
          <span className="text-[10px] text-stone-400">{weather.tempF}°F</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-stone-600 text-[11px] bg-stone-50 p-2.5 rounded-2xl">
        <div className="flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5 text-stone-400" />
          <span>Humidity: {weather.humidity}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-stone-400" />
          <span>Wind: {weather.windSpeed}</span>
        </div>
      </div>

      <p className="text-[11px] text-stone-500 leading-relaxed italic">
        {weather.seasonNote}
      </p>
    </div>
  );
}

