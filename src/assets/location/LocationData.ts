import { WeatherData } from "@/assets/weather/js/WeatherData";
import { getWeatherData } from "@/assets/weather/js/WeatherHelper";

export class LocationData  {
    city: string = "";
    latitude: number = 0;
    longitude: number = 0;
    weatherarray: WeatherData | undefined = undefined;

    constructor(city: string, latitude: number, longitude: number) {
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    async receiveWeatherData(start_date: string, end_date: string): Promise<void> {
        this.weatherarray = await getWeatherData(this.latitude, this.longitude, start_date, end_date);
    }
}