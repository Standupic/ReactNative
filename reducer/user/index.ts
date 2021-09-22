import {GET_USER} from "../../constants";
import {IUserAPIUserData} from "../../api/types/user";

interface IInitialState {
    currentUser: IUserAPIUserData | null
    hasTaken: boolean,
}

const INITIAL_STATE: IInitialState = {
    currentUser: null,
    hasTaken: false,
}

type ACTION_TYPE = 
    | {
        type: typeof GET_USER
        payload: IUserAPIUserData
       }

const User = (state = INITIAL_STATE, action: ACTION_TYPE) => {
    switch (action.type){
        case GET_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state

    }
}

export default User