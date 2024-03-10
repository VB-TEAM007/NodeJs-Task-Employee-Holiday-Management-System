"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var employeers_1 = require("./storage/employeers");
var holidayRequests_1 = require("./storage/holidayRequests");
var holidayRulesStorage_1 = require("./storage/holidayRulesStorage");
var utils_1 = require("./utils");
var HolidayManager = /** @class */ (function () {
    function HolidayManager() {
        this.employeers = new employeers_1.default();
        this.holidayRequests = new holidayRequests_1.default();
        var rules = {
            maxConsecutiveDays: 10,
            blackoutPeriods: [
                { startDate: new Date('2024-03-01'), endDate: new Date('2024-04-01') }
            ],
        };
        this.holidayRulesStorage = new holidayRulesStorage_1.default(rules);
    }
    HolidayManager.prototype.addEmployee = function (employee) {
        this.employeers.addEmployee(employee);
    };
    HolidayManager.prototype.getEmployees = function () {
        return this.employeers.getEmployees();
    };
    HolidayManager.prototype.getHolidayRules = function () {
        return this.holidayRulesStorage.getRules();
    };
    HolidayManager.prototype.updateHolidayRules = function (rules) {
        this.holidayRulesStorage.updateRules(rules);
        console.log('Holiday rules updated successfully.');
    };
    HolidayManager.prototype.submitHolidayRequest = function (request) {
        if ((0, utils_1.validateHolidayRequest)(request, this.holidayRulesStorage.getRules())) {
            this.holidayRequests.addHolidayRequest(request);
        }
    };
    HolidayManager.prototype.viewPendingHolidayRequests = function () {
        return this.holidayRequests
            .getHolidayRequests()
            .filter(function (request) { return request.status === 'pending'; });
    };
    HolidayManager.prototype.approveHolidayRequest = function (requestId) {
        var request = this.holidayRequests
            .getHolidayRequests()
            .find(function (request) { return request.status === 'pending' && request.employeeId === requestId; });
        if (request) {
            // Update request status to approved
            request.status = 'approved';
            var employees = this.getEmployees();
            this.employeers[requestId].remainingHolidays -= Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24));
            this.employeers.updateEmployee(employees);
            console.log('Holiday request approved successfully.');
        }
        else {
            console.log('Invalid request ID or request already approved/rejected.');
        }
    };
    HolidayManager.prototype.rejectHolidayRequest = function (requestId) {
        var request = this.holidayRequests
            .getHolidayRequests()
            .find(function (request) { return request.status === 'pending' && request.employeeId === requestId; });
        if (request) {
            // Update request status to rejected
            request.status = 'rejected';
            console.log('Holiday request rejected successfully.');
        }
        else {
            console.log('Invalid request ID or request already approved/rejected.');
        }
    };
    return HolidayManager;
}());
exports.default = HolidayManager;
