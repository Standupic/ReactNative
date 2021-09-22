import {SUCCESS_AUTH, ERROR_AUTH, LOADING_AUTH, RESET_AUTH} from "../../constants";

interface IInitialState {
    isLoading: boolean,
    success: boolean,
    error: boolean,
    message: string | null,
}

const INITIAL_STATE: IInitialState = {
    isLoading: false,
    success: false,
    error: false,
    message: null
}

type ACTION_TYPE = 
    | { type: typeof LOADING_AUTH }
    | { 
        type: typeof SUCCESS_AUTH
      }
    | { type: typeof RESET_AUTH }
    | { 
        type: typeof ERROR_AUTH,
        message: string 
      }

    
    
const Auth = (state = INITIAL_STATE, action: ACTION_TYPE) => {
    switch (action.type){
        case LOADING_AUTH:
            return {
                ...state,
                isLoading: true
            }
        case SUCCESS_AUTH:
            return {
                ...state,
                isLoading: false,
                success: true
            }
        case ERROR_AUTH:
            return {
                ...state,
                isLoading: false,
                success: false,
                error: true,
                message: action.message,
            }
        case RESET_AUTH: 
            return  {
                ...state,
                ...INITIAL_STATE
            }
        default: 
            return state    
            
    }
}

export default Auth;