import {ICompany} from "./company";

export interface IRefundPointAPI {
    id: string;
    name: string;
    address: string;
    company: ICompany[];
    description: string;
    status: 'active' | 'not_active';
    createdAt: string;
    updatedAt: string;
    disabledButton: true;
}