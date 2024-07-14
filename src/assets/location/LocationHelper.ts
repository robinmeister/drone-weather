import { LocationData } from "@/assets/location/LocationData";

async function getLocationDataFromAPI(standort: string) : Promise<any> {
    const request = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + standort + "&count=10&language=de&format=json");
    return await request.json();
}

function convertJsonToLocationDataArray(json: any): LocationData | undefined {
    let locationelement: LocationData | undefined = undefined;
    if (json.hasOwnProperty("results")) {
        const element = json.results[0];
        locationelement = new LocationData("", element.latitude, element.longitude);
    } else {
        locationelement = new LocationData("", json.lat, json.lon);
    }
    return locationelement;
}


export async function getLocationData(coord: any, inputdata: string) : Promise<LocationData | undefined> {
    let locationData: LocationData | undefined;

    if (coord !== undefined) {
        locationData = convertJsonToLocationDataArray(coord);
    } else {
        const locationdatajson: any = await getLocationDataFromAPI(inputdata)
        locationData = convertJsonToLocationDataArray(locationdatajson);
    }

    //const locationdatajson: any = await getLocationDataFromAPI(location)
    //locationData = convertJsonToLocationDataArray(coord);
    return locationData;
}