
export interface LongTermForecast {
    place: Place
    forecastType: string
    forecastCreationTimeUtc: string
    forecastTimestamps: ForecastTimestamp[]
}

export interface Place {
    code: string
    name: string
    administrativeDivision: string
    country: string
    countryCode: string
    coordinates: Coordinates
}

export interface Coordinates {
    latitude: number
    longitude: number
}

export interface ForecastTimestamp {
    forecastTimeUtc: string
    airTemperature: number
    feelsLikeTemperature: number
    windSpeed: number
    windGust: number
    windDirection: number
    cloudCover: number
    seaLevelPressure: number
    relativeHumidity: number
    totalPrecipitation: number
    conditionCode: string
}

export interface DailyForecast {
    date: string
    minTemp: number
    maxTemp: number
}
