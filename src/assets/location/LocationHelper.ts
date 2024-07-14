import { LocationData } from "@/assets/location/LocationData";

async function getLocationDataFromAPI(standort: string) : Promise<any> {
    const request = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + standort + "&count=10&language=de&format=json");
    return await request.json();
}

function convertJsonToLocationDataArray(json: any): LocationData | undefined {
    let locationelement: LocationData | undefined = undefined;
    if (json.length > 0) {
        const element: any = json[0];
        locationelement = new LocationData(element.name, element.latitude, element.longitude);
    }
    return locationelement;
}


export async function getLocationData(location: string) : Promise<LocationData | undefined> {
    let locationData: LocationData | undefined = undefined;
    const locationdatajson: any = await getLocationDataFromAPI(location)
    locationData = convertJsonToLocationDataArray(locationdatajson.results);
    return locationData;
}