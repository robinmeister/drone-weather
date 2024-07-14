import { WeatherData } from "@/assets/weather/js/WeatherData";
import { WindSpeed } from "@/assets/weather/js/WindSpeed";

export async function getWeatherData(lat: number, long: number, start_date: string, end_date: string): Promise<WeatherData | undefined> {
    const weatherjson: any = await getWeatherDataAsJson(lat, long, start_date, end_date);
    return convertJsonToWeatherarray(weatherjson);
}

function convertJsonToWeatherarray(json: any) : WeatherData | undefined {
    let weatherdata: WeatherData | undefined = undefined;
    let windspeedarray: WindSpeed[] = [];

    let hourlytimearray: any = [];
    let hourlywindspeed_10: any = [];
    let hourlywindspeed_80: any = [];
    let hourlywindspeed_120: any = [];
    let hourlywindspeed_180: any = [];

    let dailytime: string = "";
    let tempMaxArray: any = [];
    let tempMinArray: any = [];
    let dailywindspeedarray: any = [];

    let rain: number = 0;
    let snow: number = 0;

    if (json.hasOwnProperty("current")) {
        const currentjson = json.current;
        rain = currentjson.rain;
        snow = currentjson.snowfall;
    }

    if (json.hasOwnProperty("hourly")) {
        const timejson = json.hourly;

        hourlytimearray = timejson.time;
        hourlywindspeed_10 = timejson.wind_speed_10m;
        hourlywindspeed_80 = timejson.wind_speed_80m;
        hourlywindspeed_120 = timejson.wind_speed_120m;
        hourlywindspeed_180 = timejson.wind_speed_180m;

        for (let i: number = 0; i < hourlytimearray.length; i++) {
            const datestring: string = hourlytimearray[i];
            const wind_10: string = hourlywindspeed_10[i];
            const wind_80: string = hourlywindspeed_80[i];
            const wind_120: string = hourlywindspeed_120[i];
            const wind_180: string = hourlywindspeed_180[i];
            windspeedarray.push(new WindSpeed(new Date(datestring), parseFloat(wind_10), parseFloat(wind_80), parseFloat(wind_120), parseFloat(wind_180)));
        }
    }

    if (json.hasOwnProperty("daily")) {
        const dailyjson = json.daily;

        dailytime = dailyjson.time[0];
        tempMaxArray = dailyjson.temperature_2m_max;
        tempMinArray = dailyjson.temperature_2m_min;
        dailywindspeedarray = dailyjson.wind_speed_10m_max;

        weatherdata = new WeatherData(tempMinArray[0], tempMaxArray[0], 0, dailywindspeedarray[0], new Date(dailytime), snow, rain, windspeedarray);
    }
    return weatherdata;
}

async function getWeatherDataAsJson(lat: number, long: number, start_date: string, end_date: string): Promise<any> {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat.toString() + "&longitude=" + long.toString() + "&current=rain,showers,snowfall,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin&start_date=2024-07-14&end_date=2024-07-14")
    return await response.json();
}
