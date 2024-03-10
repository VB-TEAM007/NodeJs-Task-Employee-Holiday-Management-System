"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.validateHolidayRequest = void 0;
function validateHolidayRequest(request, rules) {
    // Check if the requested dates fall within blackout periods
    if (rules.blackoutPeriods.some(function (period) { return isDateWithinRange(request.startDate, period.startDate, period.endDate) ||
        isDateWithinRange(request.endDate, period.startDate, period.endDate); })) {
        console.log('Holiday request falls within a blackout period.');
        return false;
    }
    var totalDaysRequested = Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (totalDaysRequested > rules.maxConsecutiveDays) {
        console.log('Holiday request exceeds the maximum consecutive days allowed.');
        return false;
    }
    else
        return true;
}
exports.validateHolidayRequest = validateHolidayRequest;
function isDateWithinRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}
function formatDate(date) {
    return date.toLocaleDateString("en-GB", { year: 'numeric', day: 'numeric', month: 'short' });
}
exports.formatDate = formatDate;
