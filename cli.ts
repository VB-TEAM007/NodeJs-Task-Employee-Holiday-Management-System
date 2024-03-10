import * as readline from 'readline';
import Manager from './manager';
import { HolidayRequest } from './interfaces/holidayRequest';
import { formatDate } from './utils';

const manager = new Manager();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var firstId = 1;

function addEmployee(): void {
    rl.question('Enter employee name: ', (name) => {
        const employee = { id: firstId++, name, remainingHolidays: 20 };
        manager.addEmployee(employee);
        console.log('Employee added successfully.');
        start();
    });
}

function viewEmployees(): void {
    const employees = manager.getEmployees();
    console.log('Employees:');
    employees.forEach(employee => {
        console.log(`ID: ${employee.id}, Name: ${employee.name}, Remaining Holidays: ${employee.remainingHolidays}`);
    });
    start();
}

function submitHolidayRequest(): void {
        rl.question('Enter employee ID: ', (idInput) => {
        const employeeId = parseInt(idInput);
        const employee = manager.getEmployees().find(emp => emp.id === employeeId);
        if (!employee) {
            console.log('Invalid ID.');
            start();
            return;
        }

        rl.question('Enter start date (YYYY-MM-DD): ', (startDateInput) => {
            const startDate = new Date(startDateInput);
            if (isNaN(startDate.getTime())) {
                console.log('Invalid start date format.');
                start();
                return;
            }

            rl.question('Enter end date (YYYY-MM-DD): ', (endDateInput) => {
                const endDate = new Date(endDateInput);
                if (isNaN(endDate.getTime())) {
                    console.log('Invalid end date format.');
                    start();
                    return;
                }

                const request: HolidayRequest = { employeeId, startDate, endDate, status: 'pending' };
                manager.submitHolidayRequest(request);
                start();
            });
        });
    });
}



function viewPendingHolidayRequests(): void {
    const pendingRequests = manager.viewPendingHolidayRequests();
    console.log('Pending Holiday Requests:');
    pendingRequests.forEach(request => {
        console.log(`Employee ID: ${request.employeeId}, Start Date: ${formatDate(request.startDate)}, End Date: ${formatDate(request.endDate)}`);
    });
}

function approveHolidayRequest(): void {
    viewPendingHolidayRequests();
    rl.question('Enter employee ID to approve: ', (requestIdInput) => {
        const requestId = parseInt(requestIdInput);
        manager.approveHolidayRequest(requestId);
        
        start();
    });
}

function rejectHolidayRequest(): void {
    viewPendingHolidayRequests();
    rl.question('Enter employee ID to reject: ', (requestIdInput) => {
        const requestId = parseInt(requestIdInput);
        manager.rejectHolidayRequest(requestId);
        start();
    });
}
function editHolidaysRules(){
    const currentRules = manager.getHolidayRules();
    console.log('Current Holiday Rules:');
    console.log(currentRules);

    rl.question('Enter new maximum consecutive days: ', (maxConsecutiveDaysInput) => {
        const maxConsecutiveDays = parseInt(maxConsecutiveDaysInput);
        rl.question('Enter new blackout periods (start date, end date; separate with comma): ', (blackoutPeriodsInput) => {
            const blackoutPeriods: { startDate: Date; endDate: Date }[] = [];
            const periods = blackoutPeriodsInput.split(';');
            periods.forEach(period => {
                const [startDateString, endDateString] = period.trim().split(',');
                const startDate = new Date(startDateString);
                const endDate = new Date(endDateString);
                if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                    blackoutPeriods.push({ startDate, endDate });
                } else {
                    console.log('Invalid date format.');
                }
            });
            const newRules = { maxConsecutiveDays, blackoutPeriods };
            manager.updateHolidayRules(newRules);
            start();
        });
    });
}


function start(): void {
    rl.question('Choose an option:\n1. Add Employee\n2. View Employees\n3. Submit Holiday Request' + 
    '\n4. View Pending Holiday Requests\n5. Approve Holiday Request\n6. Reject Holiday Request\n7. Edit Holidays Rules \n8. Exit\n', (option) => {
        switch (option) {
            case '1':
                addEmployee();
                break;
            case '2':
                viewEmployees();
                break;
            case '3':
                submitHolidayRequest();
                break;
            case '4':
                viewPendingHolidayRequests();
                start();
                break;
            case '5':
                approveHolidayRequest();
                break;
            case '6':
                rejectHolidayRequest();
                break;
            case '7':
                editHolidaysRules();
                break;
            case '8':
                rl.close();
                break;
            default:
                console.log('Invalid option.');
                start();
        }
    });
}

start();