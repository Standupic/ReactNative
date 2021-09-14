import {IssuersAPI} from "./issuers";
import {ICompany} from "./company";

export interface ICompanyGroup {
    createdAt: string;
    id: string;
    name: string;
    status: string;
    type: 'retail' | 'voucher_agent' | 'refund_agent';
    updatedAt: string;
    issuers: IssuersAPI[];
    companies: ICompany[];
}