import { WindSpeed } from "@/assets/weather/js/WindSpeed";

export class WeatherData {
    rain: boolean = false;
    snow: boolean = false;
    date: Date = new Date();
    maxWindspeed: number = 0;
    minWindspeed: number = 0;
    minTemp: number = 0;
    maxTemp: number = 0;
    windspeed: WindSpeed[] = [];

    constructor(minTemp: number, maxTemp: number, minWindspeed: number, maxWindspeed: number, date: Date, snow: number, rain: number, windspeed: WindSpeed[]) {
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.minWindspeed = minWindspeed;
        this.maxWindspeed = maxWindspeed;
        this.date = date;
        this.snow = snow !== 0;
        this.rain = rain !== 0;
        this.windspeed = windspeed;
    }
}