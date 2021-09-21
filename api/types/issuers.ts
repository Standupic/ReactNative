import {ICompany, ICompanyAPI} from "./company";
import {fiscalAccumulators} from './fiscal';

export interface IssuersAPI {
    id: string;
    name: string;
    address: string;
    company: ICompanyAPI[];
    annulation: boolean;
    fiscalAccumulatorTolist: boolean;
    goodsWithoutNds: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface IssuerPointAPI {
    id: string;
    createdAt: string;
    name: string;
    status: 'active' | 'not_active';
    address: string;
    company: Array<ICompany & { fiscalAccumulators: fiscalAccumulators[] }>;
    isIssueAvailable: boolean;
    annulation: boolean;
    fiscalAccumulatorTolist: boolean;
    goodsWithoutNds: boolean;
}