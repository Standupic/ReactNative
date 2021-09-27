import {GET_USER, STATUS_CONNECT} from "../../constants";
import {IUserAPIUserData} from "../../api/types/user";

interface IInitialState {
    isConnected: boolean
}

const INITIAL_STATE: IInitialState = {
    isConnected: true
}

type ACTION_TYPE =
    | {
        type: typeof STATUS_CONNECT
        payload: boolean
    }

const Net = (state = INITIAL_STATE, action: ACTION_TYPE) => {
    switch (action.type){
        case STATUS_CONNECT:
            return {
                ...state,
                isConnected: action.payload,
            }
        default:
            return state

    }
}

export default Net