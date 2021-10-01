export interface IGenericVat {
    createdAt?: string;
    dateBegin?: string;
    fee: number; // процент отдачи
    id: string;
    updatedAt?: string;
    vat: number;
    name: string;
}
export interface IUnits {
    ftsCode: string;
    ftsName: string;
    id: string;
    voucherName: string;
    declensions: string[];
}
