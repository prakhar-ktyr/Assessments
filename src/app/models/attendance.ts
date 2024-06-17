export class Attendance {
    id: number;
    userId: number;
    date: Date;
    status: string;
    constructor(id: number, uId: number, date: Date, status: string) {
        this.id = id;
        this.userId = uId;
        this.date = date;
        this.status = status;
    }

}