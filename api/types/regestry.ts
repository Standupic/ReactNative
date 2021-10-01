import { VoucherInterface } from './voucher';
import { IRefundPointAPI } from './refund';
import {IUserAPIUserData} from "./user";

export interface RegistryFilter {
    number: string;
    createdAt: string | null;
    status: string | null;
    type: string | null;
    refundOffice: IRefundPointAPI | null;
}

export interface RegistryToPayFilter {
    number: string;
    createdAt: string | null;
    status: string | null;
}

export enum ERegistryType {
    PaidByCash = 'paid_by_cash',
    NotPaid = 'not_paid',
}

export type RegistryStatus =
    | 'assembles'
    | 'to_sending_to_main_office'
    | 'to_sending_to_operator'
    | 'waiting_for_courier'
    | 'sent_to_operator'
    | 'lost_on_delivery'
    | 'delivered_to_operator'
    | 'delivered_with_damages'
    | 'accepted_by_operator'
    | 'received_with_variances'
    | 'pending_settlement';

export interface Registry {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: RegistryStatus;
    type: 'paid_by_cash' | 'not_paid';
    vouchers?: VoucherInterface[];
    registryVoucherCheckeds?: VoucherInterface[];
    registryVoucherWithIssues?: VoucherInterface[];
    refundOffice?: IRefundPointAPI;
    createdBy?: IUserAPIUserData;
    voucherRegistryStatusHistories?: RegistryStatusHistory[];
    isEnvelopesDamaged: boolean;
    isPackageDamaged: boolean;
    costOfDelivery: string;
}

export interface RegistryProcessingForm {
    isEnvelopesDamaged: boolean;
    isPackageDamaged: boolean;
    costOfDelivery: number | null;
}

export interface RegistryStatusHistory {
    createdAt: string;
    id: number;
    newStatus: RegistryStatus;
    oldStatus: RegistryStatus;
    updatedAt: string;
}

export interface RegistryForm {
    vouchers: VoucherInterface[];
}

export interface RegistrySendFilter {
    number: string;
    createdAt: string | null;
    status: string | null;
}

export interface RegistryCount {
    voucherRegistryCount: number;
    vouchersCount: number;
}
