import { DailyForecast } from "~/types/ForecastTypes";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

export type WeeklyWeatherCardProps = {
  groupedDataByDay: DailyForecast[]
}

export function WeeklyWeatherCard({ groupedDataByDay }: WeeklyWeatherCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle>Weekly forecast</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 w-full">
        {groupedDataByDay.map((forecast, index) =>
          <div key={index} className="flex flex-col items-center gap-4">
            <span>{forecast.date}</span>
            <span>{forecast.minTemp}{"\u00B0"}C/{forecast.maxTemp}{"\u00B0"}C</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
