import {IGenericVat, IUnits} from "./generic";
import {ICompany, ICompanyInfo} from "./company";
import {Registry} from "./regestry";
import {IRefundPointAPI} from "./refund";
import {IIssuer, IssuerPointAPI} from "./issuers";
import {IGenericAPICountriesResponse} from "./contry";
import {IFiscalAPI} from "./fiscal";

export interface IVoucherReceiptItemData {
    id?: string;
    article: string;
    label: string;
    pricePerItem: string;
    quantity: string;
    quantityMax: string;
    totalPrice: string;
    measure: string;
    vat: string;
    isRefundable: boolean;
}

export interface IVoucherReceiptData {
    id?: string;
    number: string;
    fiscalAccumulator: string;
    type: VoucherReceiptType;
    items: {
        [id: string]: IVoucherReceiptItemData;
    };
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    issuedAt?: string;
    vatRaits?: IGenericVat[];
    company?: string;
}

export interface ISerializableVoucherReceiptData {
    identifier?: string;
    number: string;
    fiscalAccumulator: string;
    type: VoucherReceiptType;
    company?: string;
    issuedAt?: string;
    items: Array<IVoucherReceiptItemData & { position: number }>;
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    vatRaits?: IGenericVat[];
}

export interface IVoucherData {
    identifier?: string;
    hrIdentifier?: string;
    company: string;
    issuedAt: string;
    fiscalReceipts: Record<string, IVoucherReceiptData>;
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    status: string;
}

export interface ISerializableVoucherData {
    identifier?: string;
    hrIdentifier?: string;
    company: string;
    issuedAt: string;
    fiscalReceipts: ISerializableVoucherReceiptData[];
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
    status?: string;
}

export interface ICompanyActiveVoucher {
    [key: string]: string | ICompanyInfo;
    id: string;
    name: string;
    status: string;
    companyInfo: ICompanyInfo;
    createdAt: string;
    updatedAt: string;
}

export interface IActiveVoucherAPIData {
    companyInfo: ICompanyActiveVoucher;
    issuedAt: string;
    identifier: string;
    totalAmount: string;
    taxationAmount: string;
    refundableAmount: string;
}

export type VoucherStatus =
    | 'created'
    | 'stamped'
    | 'refunded_to_card'
    | 'refunded_by_cash'
    | 'in_progress'
    | 'sent_to_bank'
    | 'for_bank_pay'
    | 'refusal'
    | 'refusal_by_bank_rejected'
    | 'refusal_no_customs_mark'
    | 'refusal_no_payment_method'
    | 'refusal_by_export_period'
    | 'refusal_by_refund_period'
    | 'error'
    | 'error_no_customs_mark'
    | 'error_no_payment_method'
    | 'error_bank_rejected'
    | 'cancelled_by_refund_office'
    | 'cancelled_by_operator'
    | 'cancelled_by_shop'
    | 'registered'
    | 'rejected_by_fcs';

export interface VoucherStatusHistory {
    createdAt: string;
    updatedAt: string;
    newStatus: VoucherStatus;
    oldStatus: VoucherStatus;
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

export interface VoucherInterface {
    id: string;
    identifier: string;
    hrIdentifier: string;
    createdAt: string;
    updatedAt: string;
    status: VoucherStatus;
    statusBeforePaymentInfoChange?: VoucherStatus;
    refundableAmount: number | string;
    totalAmount: number | string;
    taxationAmount: number | string;
    company: ICompany;
    consumer: IVoucherAPIConsumer;
    fiscalReceipts: VoucherFiscalReceipt[];
    voucherRegistries?: Registry[];
    issuedAt: string;
    voucherStatusHistories: VoucherStatusHistory[];
    refundOffice?: IRefundPointAPI;
    paymentInfo?: VoucherPaymentInfo | null;
    issuer: IIssuer;
}

export interface VouchersFilter {
    hrIdentifier: string;
    createdAt: string | null;
    updatedAt: string | null;
    company: ICompany | null;
    status: string | null;
    statusArray: string[];
    totalAmount: string | null;
    fiscalAccumulatorNumber: string | null;
    fiscalIssuedAt: string | null;
    refundOffice: IRefundPointAPI | null;
    issuer: IssuerPointAPI | null;
}

export interface Totals {
    totalAmount: number;
    taxationAmount: number;
    refundableAmount: number;
}

export interface VoucherCardForm {
    cardNumber: string;
    cardExpirationDate: string;
    phoneNumber: string;
    email: string;
    issueTypes: VoucherIssueType[];
    issueComment: string;
}

export interface VoucherPaymentInfo {
    id: string;
    cardNumber: string;
    cardExpirationDate: string;
    phoneNumber: string;
    email: string;
    issueTypes?: VoucherIssueTypeInterface[];
    issueComment: string;
}

export interface VoucherIssueTypeInterface {
    id: string;
    identifier: VoucherIssueType;
}

export type VoucherIssueType =
    | 'clear_handwritten_additions'
    | 'corrections_where_should_not_be'
    | 'credit_card_expired'
    | 'crossed_out_labels_do_not_match'
    | 'export_period_ended'
    | 'illegible_card_number'
    | 'indicated_data_in_wrong_places'
    | 'invalid_credit_card_number'
    | 'no_credit_card_number'
    | 'no_customer_sign'
    | 'no_customs_officer_sign'
    | 'no_customs_officer_stamp'
    | 'no_customs_sign'
    | 'no_expiry_credit_card'
    | 'not_clear_handwritten_additions'
    | 'payment_period_ended'
    | 'some_information_is_not_visible'
    | 'status_cancelled_by_operator'
    | 'status_cancelled_by_refund_office'
    | 'status_cancelled_by_shop'
    | 'status_created'
    | 'status_in_progress'
    | 'status_refunded_by_cash'
    | 'status_rejected_by_fcs';

export type VoucherIssueCategory =
    | 'credit_card_data'
    | 'customs_data'
    | 'expired_period'
    | 'not_valid_voucher_status'
    | 'voucher_filling_out';

export interface VoucherIssueManual {
    type: VoucherIssueType;
    category: VoucherIssueCategory;
    disabled: boolean;
    status_before: VoucherStatus[];
    status_after: VoucherStatus | null;
    status_error: VoucherStatus | null;
    priority: number;
}

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


export interface VoucherFiscalReceipt extends IVoucherAPICreateVoucherFiscalReceipt {
    createdAt: string;
    id: string;
    items: VoucherFiscalReceiptItem[];
    company?: ICompany;
    fiscalAccumulator?: IFiscalAPI;
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
