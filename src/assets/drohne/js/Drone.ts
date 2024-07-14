export class Drone {
    img: File | undefined = undefined;
    name: string = "";
    description: string = "";
    maxWindspeed: number = 0;

    constructor(name: string, description: string, maxWindspeed: number, img: File | undefined = undefined) {
        this.name = name;
        this.description = description;
        this.maxWindspeed = maxWindspeed;
        this.img = img;
    }

    canFlight(currentWindSpeed: number): boolean {
        return currentWindSpeed <= this.maxWindspeed;
    }
}