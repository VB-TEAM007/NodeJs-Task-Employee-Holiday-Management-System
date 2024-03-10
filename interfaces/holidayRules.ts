export interface HolidayRules {
    maxConsecutiveDays: number,
    blackoutPeriods: {
        startDate: Date,
        endDate: Date,
    }[];
}