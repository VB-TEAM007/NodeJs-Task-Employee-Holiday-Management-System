import { HolidayRequest } from './interfaces/holidayRequest';
import { HolidayRules } from './interfaces/holidayRules';

export function validateHolidayRequest(request: HolidayRequest, rules: HolidayRules): boolean {
    
    // Check if the requested dates fall within blackout periods
    if (rules.blackoutPeriods.some(period => isDateWithinRange(request.startDate, period.startDate, period.endDate) ||
        isDateWithinRange(request.endDate, period.startDate, period.endDate))) {
        console.log('Holiday request falls within a blackout period.');
        return false;
    }
    const totalDaysRequested = Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (totalDaysRequested > rules.maxConsecutiveDays) {
        console.log('Holiday request exceeds the maximum consecutive days allowed.');
        return false;
    }
    else return true;
}
function isDateWithinRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-GB", { year: 'numeric', day: 'numeric', month: 'short'});
}