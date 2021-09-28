import {UserSettings} from "../auth";
import {IssuerPointAPI} from "../../api/types/issuers";

export const getCurrentIssuer = (issuers: IssuerPointAPI[] | undefined, id: string | null ) => {
    if(!issuers) return undefined
    if(issuers && issuers.length && id){
        return issuers.find((issuer) => issuer.id === id)
    }
}