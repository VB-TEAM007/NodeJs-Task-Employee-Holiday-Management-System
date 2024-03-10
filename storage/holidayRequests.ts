import { HolidayRequest } from "../interfaces/holidayRequest";

export default class HolidayRequests {
    private  holidayRequests: HolidayRequest[] = [];

    addHolidayRequest(holidayRequest: HolidayRequest): void {
        this.holidayRequests.push(holidayRequest);
    }

    getHolidayRequests(): HolidayRequest[] {
        return this.holidayRequests;
    }
}