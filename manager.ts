import { Employee } from './interfaces/employee';
import { HolidayRequest } from './interfaces/holidayRequest';
import { HolidayRules } from './interfaces/holidayRules';
import Employeers from './storage/employeers';
import HolidayRequests from './storage/holidayRequests';
import HolidayRulesStorage from './storage/holidayRulesStorage';
import { validateHolidayRequest } from './utils';

export default class HolidayManager {
    private employeers: Employeers;
    private holidayRequests: HolidayRequests;
    private holidayRulesStorage: HolidayRulesStorage;

    constructor(){
        this.employeers = new Employeers();
        this.holidayRequests = new HolidayRequests();
        const rules: HolidayRules = {
            maxConsecutiveDays: 10,
            blackoutPeriods: [
                { startDate: new Date('2024-03-01'), endDate: new Date('2024-04-01')}],
        };
        this.holidayRulesStorage = new HolidayRulesStorage(rules);
    }

    addEmployee(employee: Employee): void {
        this.employeers.addEmployee(employee);
    }

    getEmployees(): Employee[]{
        return this.employeers.getEmployees();
    }

    getHolidayRules(): HolidayRules{
        return this.holidayRulesStorage.getRules();
    }

    updateHolidayRules(rules: HolidayRules): void {
        this.holidayRulesStorage.updateRules(rules);
        console.log('Holiday rules updated successfully.');
    }

    submitHolidayRequest(request: HolidayRequest): void {
        if (validateHolidayRequest(request, this.holidayRulesStorage.getRules())) {
            this.holidayRequests.addHolidayRequest(request);
        } 
    }

    viewPendingHolidayRequests(): HolidayRequest[] {
        return this.holidayRequests
            .getHolidayRequests()
            .filter(request => request.status === 'pending');
    }

    approveHolidayRequest(requestId: number): void {
        const request = this.holidayRequests
            .getHolidayRequests()
            .find(request => request.status === 'pending' && request.employeeId === requestId);

        if (request) {
            request.status = 'approved';
            /*const employees = this.getEmployees();
            this.employeers[requestId].remainingHolidays -= Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24));
            this.employeers.updateEmployee(employees);
            */
            console.log('Holiday request approved successfully.');
        } else {
            console.log('Invalid request ID or request already approved/rejected.');
        }
    }

    

    rejectHolidayRequest(requestId: number): void {
        const request = this.holidayRequests
            .getHolidayRequests()
            .find(request => request.status === 'pending' && request.employeeId === requestId);

        if (request) {
            request.status = 'rejected';
            console.log('Holiday request rejected successfully.');
        } else {
            console.log('Invalid request ID or request already approved/rejected.');
        }
    }
}
