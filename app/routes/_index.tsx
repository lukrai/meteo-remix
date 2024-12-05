import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LongTermForecast } from "~/types/ForecastTypes";
import { groupByDay } from "~/lib/dateUtils";
import { CityOption, cityOptions, ToggleButtons } from "~/components/ui/toggleButtons";
import { useState } from "react";
import { CurrentWeatherCard } from "~/components/ui/currentWeatherCard";
import { HourlyWeatherCard } from "~/components/ui/hourlyWeatherCard";
import { WeeklyWeatherCard } from "~/components/ui/weeklyWeatherCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Meteo Remix App" },
  ];
};

export async function loader() {
  const res = await fetch("https://api.meteo.lt/v1/places/vilnius/forecasts/long-term");
  return json<LongTermForecast>(await res.json());
}

export default function Index() {
  const forecasts = useLoaderData<typeof loader>();
  const groupedByDay = groupByDay(forecasts.forecastTimestamps);
  const [selectedCity, setSelectedCity] = useState<CityOption>(cityOptions[0])

  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex flex-col items-center gap-8">
        <ToggleButtons selected={selectedCity} setSelected={setSelectedCity} />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <CurrentWeatherCard forecast={forecasts} />
          <HourlyWeatherCard forecasts={forecasts} />
        </div>
        <WeeklyWeatherCard groupedDataByDay={groupedByDay} />
      </div>
    </div>
  );
}
