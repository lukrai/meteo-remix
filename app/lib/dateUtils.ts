import { parseJSON } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";
import { ForecastTimestamp, DailyForecast } from "~/types/ForecastTypes";

export function groupByDay(forecasts: ForecastTimestamp[]): DailyForecast[] {
  const grouped = forecasts.reduce((acc, forecast) => {
    const parsedDate = parseJSON(forecast.forecastTimeUtc);
    const localTime = toZonedTime(parsedDate, "Europe/Vilnius");
    const date = format(localTime, 'MM-dd');
    if (!acc[date]) {
      acc[date] = { date, minTemp: forecast.airTemperature, maxTemp: forecast.airTemperature };
    } else {
      acc[date].minTemp = Math.min(acc[date].minTemp, forecast.airTemperature);
      acc[date].maxTemp = Math.max(acc[date].maxTemp, forecast.airTemperature);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  return Object.values(grouped);
}
