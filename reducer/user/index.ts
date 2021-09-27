import {GET_USER} from "../../constants";
import {IUserAPIUserData} from "../../api/types/user";
import {IssuerPointAPI} from "../../api/types/issuers";

interface IInitialState {
    currentUser: IUserAPIUserData | null
    hasToken: boolean,
    issuers:  IssuerPointAPI[] | undefined,
}

const INITIAL_STATE: IInitialState = {
    currentUser: null,
    hasToken: false,
    issuers: undefined,
}

type ACTION_TYPE = 
    | {
        type: typeof GET_USER
        payload: IUserAPIUserData
       }

const User = (state = INITIAL_STATE, action: ACTION_TYPE) => {
    switch (action.type){
        case GET_USER:
            const {issuers} = action.payload
            return {
                ...state,
                currentUser: action.payload,
                hasToken: true,
                issuers: issuers,
            }
        default:
            return state

    }
}

export default User