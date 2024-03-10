import { Employee } from "../interfaces/employee";

export default class Employeers {
    getEmployeeById(employeeId: number) {
        return this.employees.find(employee => employee.id === employeeId);
    }
    updateEmployee(employee: any) {
        throw new Error('Method not implemented.');
    }
    private  employees: Employee[] = [];

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getEmployees(): Employee[] {
        return this.employees;
    }
}