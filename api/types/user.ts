import {IssuerPointAPI} from "./issuers";
import {ICompanyGroup} from "./companyGroup";
import {IRefundPointAPI} from "./refund";

export interface IUserAPIUserInfo {
    id: string;
    name: string;
    phone: string;
    status: 'active' | 'deactive';
    updatedAt: string;
    user: string;
}

export interface IGroupsAPIUser {
    id: string;
    name: string;
    roles: EUserRole[];
}

export interface IUserAPIUserData {
    id: string;
    email: string;
    login: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    userInfo?: IUserAPIUserInfo;
    groups: IGroupsAPIUser[];
    issuers?: IssuerPointAPI[];
    refundOffices?: IRefundPointAPI[];
    shouldChangePassword: boolean;
    companyGroup?: ICompanyGroup;
    plainPassword?: string; // нужно для отправки пароля
}

export enum EUserRole {
    ROLE_CLIENT_CASHIER = 'ROLE_CLIENT_CASHIER', // Кассир клиента
}
  