export interface HolidayRequest {
    employeeId: number;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'approved' | 'rejected';
}