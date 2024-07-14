export class WindSpeed {
    date: Date = new Date();
    speed_10: number = 0;
    speed_80: number = 0;
    speed_120: number = 0;
    speed_180: number = 0;

    constructor(date: Date, speed_10: number, speed_80: number, speed_120: number, speed_180: number) {
        this.date = date;
        this.speed_10 = speed_10;
        this.speed_80 = speed_80;
        this.speed_120 = speed_120;
        this.speed_180 = speed_180;
    }
}