import {ICompanyGroup} from "./companyGroup";
import {IFiscalAPI} from "./fiscal";
import {CompanyContactType, CompanyDocumentType, DocumentCommon} from "./common";

export interface ICompanyAPI {
    id: string;
    name: string;
    status: string;
    companyInfo: ICompanyInfo;
}

export interface ICompanyInfo {
    id: string;
    inn: string;
    kpp: string;
    address: IAddress;
}

export interface IAddress {
    postalCode: string;
    region: string;
    city: string;
    streetHouse: string;
}


export interface CompanyDocument extends DocumentCommon {
    validityDateStart: string;
    validityDateEnd: string;
    type: CompanyDocumentType;
    isSigned: boolean;
}

export interface ICompany {
    contractNumber: string;
    contractDate: string;
    id: string;
    name: string;
    status: string;
    companyGroup?: ICompanyGroup;
    companyInfo?: ICompanyInfo;
    createdAt: string;
    updatedAt: string;
    fiscalAccumulators?: IFiscalAPI[];
    minpromtorgRegistrationDate: string;
    contractType: CompanyContactType;
    contractEmail: string;
    isDirectWriteOffRequired: boolean; // требуется подпуска на безакцепт
    isDirectWriteOffActivated: boolean; // Подписка активирована
    documents?: CompanyDocument[];
    stickersQuantity: string;
    envelopesQuantity: string;
    brochuresQuantity: string;
    administratorDataRequestedDate: string;
    isAdministratorDataRequested: string;
}