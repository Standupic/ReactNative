import {IGenericAPICountriesResponse} from "./contry";
import {ICompany} from "./company";
import {IFiscalAPI} from "./fiscal";
import {IGenericVat, IUnits} from "./generic";

export enum VoucherReceiptType {
    INCOME = 4,
}

export interface VoucherPassport {
    consumer: string;
    country: IGenericAPICountriesResponse;
    createdAt: string;
    id: string;
    number: string;
    status: string;
    updatedAt: string;
    series: string | null;
}

export interface IVoucherFiscalItemPayload {
    article: string | null;
    label: string;
    pricePerItem: string;
    quantity: string;
    totalPrice: string;
    measure: string;
    vat: string;
    quantityMax: string;
    isRefundable: boolean;
    position: number;
}

export interface IVoucherFiscalReceiptsPayload {
    issuedAt: string | null;
    number?: string;
    fiscalAccumulator?: string;
    type: string;
    company: string;
    items: IVoucherFiscalItemPayload[];
    refundableAmount: string;
    taxationAmount: string;
    totalAmount: string;
}

interface IVoucherConsumerPayload {
    lastName: string;
    firstName: string;
    fatherName?: string;
    passport: {
        country: string;
        number: string;
        series: string;
    };
}
export interface IVoucherPayload {
    company: string;
    issuedAt: Date;
    fiscalReceipts: IVoucherFiscalReceiptsPayload[];
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    consumer: IVoucherConsumerPayload;
    issuer?: string;
}

export interface IVoucherAPIConsumer {
    identifier: string;
    firstName: string;
    lastName: string;
    fatherName?: string | null;
    status: string;
    passport?: VoucherPassport;
    createdAt: string;
    updatedAt: string;
}

export interface IVoucherAPICreateVoucherCustomerPayload {
    firstName: string;
    lastName: string;
    fatherName?: string | null;
    passport: {
        country: string;
        number: string;
        series: string | null;
    };
}

export interface IVoucherAPICreateVoucherFiscalReceipt {
    number: string;
    type: VoucherReceiptType.INCOME;
    items: IVoucherAPICreateVoucherFiscalReceiptItem[];
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    data?: any;
}

export interface IVoucherAPICreateVoucherFiscalReceiptItem {
    position: number;
    label: string;
    pricePerItem: string;
    totalPrice: string;
    quantity: string;
    quantityMax: string;
    measure: IUnits | null;
    vat: string;
    isRefundable: boolean;
}

export interface VoucherFiscalReceiptItem
    extends Omit<IVoucherAPICreateVoucherFiscalReceiptItem, 'vat'> {
    id: string;
    article: string;
    isFtsRefundable: boolean;
    vat: IGenericVat;
    ftsErrorText?: string;
}

export interface IVoucherAPICreateVoucherPayload {
    issuedAt: string | null;
    consumer: IVoucherAPICreateVoucherCustomerPayload;
    fiscalReceipts: IVoucherFiscalReceiptsPayload[];
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    issuer?: string;
    company: string;
}
