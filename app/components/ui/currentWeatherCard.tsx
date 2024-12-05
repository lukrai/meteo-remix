import ArrowIcon from "~/assets/icons/arrow";
import { Icons } from "~/assets/icons/icons";
import { Card, CardHeader, CardDescription, CardContent } from "./card";
import { LongTermForecast } from "~/types/ForecastTypes";

export function CurrentWeatherCard({ forecast }: { forecast: LongTermForecast }) {
  const firstForecast = forecast.forecastTimestamps[0];
  return (
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
  )
}
