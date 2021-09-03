import {ERROR, SUCCESS, SIGNUP} from "./constans";

interface IInitialState {
    isLoading: boolean,
    success: boolean,
    error: boolean,
    message: string | null,
}

const INITIAL_STATE: IInitialState = {
    isLoading: true,
    success: false,
    error: false,
    message: null
}

type ACTIONTYPE = 
    | { type: typeof SIGNUP }
    | { type: typeof SUCCESS }
    | { 
        type: typeof ERROR,
        message: string 
      }

    
    
const Auth = (state = INITIAL_STATE, action: ACTIONTYPE) => {
    switch (action.type){
        case SIGNUP:
            return state
        case SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true
            }
        case ERROR:
            return {
                ...state,
                isLoading: false,
                success: false,
                message: action.message,
            }
        default: 
            return state    
            
    }
}

export default Auth