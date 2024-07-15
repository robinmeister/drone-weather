import { Drone } from "@/assets/drohne/js/Drone";
import { LocationData } from "@/assets/location/LocationData";
import { getLocationData } from "@/assets/location/LocationHelper";

export class MainData {
    location: LocationData | undefined = undefined;

    date_today: Date = new Date();
    date_string: string = this.date_today.toISOString().split("T")[0];

    async init(coord: any, inputdata: string, date_from: string = this.date_string, date_to: string = this.date_string) {
        try {
            this.location = await getLocationData(coord, inputdata);
            await this.location!!.receiveWeatherData(date_from, date_to);
        } catch (e) {
            console.log(e);
        }
    }
}