"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var manager_1 = require("./manager");
var utils_1 = require("./utils");
var manager = new manager_1.default();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var firstId = 1;
function addEmployee() {
    rl.question('Enter employee name: ', function (name) {
        var employee = { id: firstId++, name: name, remainingHolidays: 20 };
        manager.addEmployee(employee);
        console.log('Employee added successfully.');
        start();
    });
}
function viewEmployees() {
    var employees = manager.getEmployees();
    console.log('Employees:');
    employees.forEach(function (employee) {
        console.log("ID: ".concat(employee.id, ", Name: ").concat(employee.name, ", Remaining Holidays: ").concat(employee.remainingHolidays));
    });
    start();
}
function submitHolidayRequest() {
    rl.question('Enter employee ID: ', function (idInput) {
        var employeeId = parseInt(idInput);
        var employee = manager.getEmployees().find(function (emp) { return emp.id === employeeId; });
        if (!employee) {
            console.log('Invalid ID.');
            start();
            return;
        }
        rl.question('Enter start date (YYYY-MM-DD): ', function (startDateInput) {
            var startDate = new Date(startDateInput);
            if (isNaN(startDate.getTime())) {
                console.log('Invalid start date format.');
                start();
                return;
            }
            rl.question('Enter end date (YYYY-MM-DD): ', function (endDateInput) {
                var endDate = new Date(endDateInput);
                if (isNaN(endDate.getTime())) {
                    console.log('Invalid end date format.');
                    start();
                    return;
                }
                var request = { employeeId: employeeId, startDate: startDate, endDate: endDate, status: 'pending' };
                manager.submitHolidayRequest(request);
                start();
            });
        });
    });
}
function viewPendingHolidayRequests() {
    var pendingRequests = manager.viewPendingHolidayRequests();
    console.log('Pending Holiday Requests:');
    pendingRequests.forEach(function (request) {
        console.log("Employee ID: ".concat(request.employeeId, ", Start Date: ").concat((0, utils_1.formatDate)(request.startDate), ", End Date: ").concat((0, utils_1.formatDate)(request.endDate)));
    });
}
function approveHolidayRequest() {
    viewPendingHolidayRequests();
    rl.question('Enter employee ID to approve: ', function (requestIdInput) {
        var requestId = parseInt(requestIdInput);
        manager.approveHolidayRequest(requestId);
        start();
    });
}
function rejectHolidayRequest() {
    viewPendingHolidayRequests();
    rl.question('Enter employee ID to reject: ', function (requestIdInput) {
        var requestId = parseInt(requestIdInput);
        manager.rejectHolidayRequest(requestId);
        start();
    });
}
function editHolidaysRules() {
    var currentRules = manager.getHolidayRules();
    console.log('Current Holiday Rules:');
    console.log(currentRules);
    rl.question('Enter new maximum consecutive days: ', function (maxConsecutiveDaysInput) {
        var maxConsecutiveDays = parseInt(maxConsecutiveDaysInput);
        rl.question('Enter new blackout periods (start date, end date; separate with comma): ', function (blackoutPeriodsInput) {
            var blackoutPeriods = [];
            var periods = blackoutPeriodsInput.split(';');
            periods.forEach(function (period) {
                var _a = period.trim().split(','), startDateString = _a[0], endDateString = _a[1];
                var startDate = new Date(startDateString);
                var endDate = new Date(endDateString);
                if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                    blackoutPeriods.push({ startDate: startDate, endDate: endDate });
                }
                else {
                    console.log('Invalid date format.');
                }
            });
            var newRules = { maxConsecutiveDays: maxConsecutiveDays, blackoutPeriods: blackoutPeriods };
            manager.updateHolidayRules(newRules);
            start();
        });
    });
}
function start() {
    rl.question('Choose an option:\n1. Add Employee\n2. View Employees\n3. Submit Holiday Request' +
        '\n4. View Pending Holiday Requests\n5. Approve Holiday Request\n6. Reject Holiday Request\n7. Edit Holidays Rules \n8. Exit\n', function (option) {
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
