import { Drone } from "@/assets/drohne/js/Drone";
import { LocationData } from "@/assets/location/LocationData";
import { getLocationData } from "@/assets/location/LocationHelper";

export class MainData {
    //dronearray: Drone[] | undefined = undefined;
    location: LocationData | undefined = undefined;

    date_today: Date = new Date();
    date_string: string = this.date_today.toISOString().split("T")[0];

    async init(city: string) {
        try {
            this.location = await getLocationData(city);
            await this.location!!.receiveWeatherData(this.date_string, this.date_string);
        } catch (e) {
            console.log(e);
        }
    }
}