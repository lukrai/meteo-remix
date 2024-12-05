import { parseJSON } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";
import ArrowIcon from "~/assets/icons/arrow";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "./card";
import { LongTermForecast } from "~/types/ForecastTypes";

export type HourlyWeatherCardProps = {
  forecasts: LongTermForecast;
}

export function HourlyWeatherCard({ forecasts }: HourlyWeatherCardProps) {
  return (
    <Card className="lg:max-w-md">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Forecast</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          Today
        </CardTitle>
      </CardHeader>
      <CardContent>
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
  )
}

