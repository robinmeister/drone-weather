import { LocationData } from "@/assets/location/LocationData";

async function getLocationDataFromAPI(standort: string) : Promise<any> {
    const request = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + standort + "&count=10&language=de&format=json");
    return await request.json();
}

function convertJsonToLocationDataArray(json: any): LocationData | undefined {
    let locationelement: LocationData | undefined = undefined;
    locationelement = new LocationData("", json.lat, json.lon);
    return locationelement;
}


export async function getLocationData(coord: any) : Promise<LocationData | undefined> {
    let locationData: LocationData | undefined;
    //const locationdatajson: any = await getLocationDataFromAPI(location)
    locationData = convertJsonToLocationDataArray(coord);
    return locationData;
}