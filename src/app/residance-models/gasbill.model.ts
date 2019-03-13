import { Unit } from './units.model';

export class GasBill {
    _id: string;
    bill_date: Date = new Date();
    account_id: string;
    due_date: Date = new Date();
    amount: number;
    usage: string;
    outstanding: string;
    message: string;
    unit_id: string;
    publishedBy :string;
    unit: Unit = new Unit();
}