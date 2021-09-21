import {ICompany} from "./company";

export interface IFiscalAPI {
    company: ICompany;
    createdAt: string;
    id: string;
    factoryNumber: string;
    status: string;
    updatedAt: string;
    deletedAt: string;
}
export interface fiscalAccumulators {
    [key: string]: string;
    id: string;
    status: string;
    factoryNumber: string;
    company: string;
    createdAt: string;
    updatedAt: string;
}