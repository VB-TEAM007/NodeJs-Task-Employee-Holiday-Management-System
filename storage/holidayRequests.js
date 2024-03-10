"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HolidayRequests = /** @class */ (function () {
    function HolidayRequests() {
        this.holidayRequests = [];
    }
    HolidayRequests.prototype.addHolidayRequest = function (holidayRequest) {
        this.holidayRequests.push(holidayRequest);
    };
    HolidayRequests.prototype.getHolidayRequests = function () {
        return this.holidayRequests;
    };
    return HolidayRequests;
}());
exports.default = HolidayRequests;
