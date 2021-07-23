import { EmployeeEntity } from "./employee-entity";

export interface Employee extends EmployeeEntity {
    id?: number;
}