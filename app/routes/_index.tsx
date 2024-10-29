import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { parseJSON } from 'date-fns';
import { toZonedTime, format } from 'date-fns-tz';
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Icons } from "~/components/ui/icons";
import ArrowIcon from "~/assets/icons/arrow";
import { LongTermForecast } from "~/types/ForecastTypes";
import { groupByDay } from "~/lib/dateUtils";
import { CityOption, cityOptions, ToggleButtons } from "~/components/ui/toggleButtons";
import { useState } from "react";

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
  const firstForecast = forecasts.forecastTimestamps[0];
  const groupedByDay = groupByDay(forecasts.forecastTimestamps);
  const [selectedCity, setSelectedCity] = useState<CityOption>(cityOptions[0])

  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex flex-col items-center gap-16">

        <ToggleButtons selected={selectedCity} setSelected={setSelectedCity} />

        <div className="grid w-full gap-6 sm:grid-cols-1 lg:max-w-[48rem] md:grid-cols-2">
          <Card className="lg:max-w-md">
            <CardHeader className="space-y-0 pb-2">
              <CardDescription className="text-4xl">Vilnius</CardDescription>
            </CardHeader>
            <CardContent>
              <Icons.sun className="h-64 w-64" />
              <div className="grid w-full gap-6 sm:grid-cols-2">
                <div>Temperature: {firstForecast.airTemperature} {"\u00B0"}C{" "}</div>
                <div>Wind speed: <span><ArrowIcon style={{ transform: `rotate(${firstForecast.windDirection}deg)` }} /></span>
                  <span>{firstForecast.windSpeed}{" "}m/s{" "}</span>
                </div>
                <div>Cloud cover: {firstForecast.cloudCover}%</div>
                <div>Wind gust: {firstForecast.windGust}{" "}m/s</div>
                <div>Total precipitation: {firstForecast.totalPrecipitation} mm</div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:max-w-md">
            <CardHeader className="space-y-0 pb-2">
              <CardDescription>Forecast</CardDescription>
              <CardTitle className="text-4xl tabular-nums">
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* First ten forcasts */}
              {forecasts.forecastTimestamps.slice(0, 10).map((forecast, index) => {
                const parsedDate = parseJSON(forecast.forecastTimeUtc);
                const localTime = toZonedTime(parsedDate, "Europe/Vilnius");

                return (
                  <p key={index}>
                    <span>{format(localTime, 'HH:mm')}{" "}</span>
                    <span>{forecast.conditionCode}{" "}</span>
                    <span>{forecast.airTemperature} {"\u00B0"}C{" "}</span>
                    <span><ArrowIcon style={{ transform: `rotate(${forecast.windDirection}deg)` }} /></span>
                    <span>{forecast.windSpeed}{" "}m/s{" "}</span>
                    <span>{forecast.windGust}{" "}m/s{" "}</span>
                    <span>{forecast.cloudCover}% </span>
                    <span>{forecast.totalPrecipitation} mm</span>
                  </p>
                );
              }
              )}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Weekly forecast</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 w-full">
            {groupedByDay.map((forecast, index) =>
              <div key={index} className="flex flex-col items-center gap-4">
                <span>{forecast.date}</span>
                <span>{forecast.minTemp}{"\u00B0"}C/{forecast.maxTemp}{"\u00B0"}C</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
