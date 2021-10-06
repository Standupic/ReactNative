export interface DocumentCommon {
    id: number;
    filename: string;
    contentUrl: string;
    fileSize?: string;
    createdAt?: string;
}

export interface Credentials {
    refresh_token: string;
    token: string;
}

export type CompanyContactType = 'contract' | 'offer'
export type CompanyDocumentType = 'contract' | 'power_of_attorney' | 'MPT_statement';


export interface ActivityIndicator {
    isLoading: boolean,
    success: boolean,
    error: boolean,
}