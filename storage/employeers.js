"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employeers = /** @class */ (function () {
    function Employeers() {
        this.employees = [];
    }
    Employeers.prototype.getEmployeeById = function (employeeId) {
        throw new Error('Method not implemented.');
    };
    Employeers.prototype.updateEmployee = function (employee) {
        throw new Error('Method not implemented.');
    };
    Employeers.prototype.find = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Employeers.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Employeers.prototype.getEmployees = function () {
        return this.employees;
    };
    return Employeers;
}());
exports.default = Employeers;
