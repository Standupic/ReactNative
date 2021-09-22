import { AppDispatch } from '../../store'
import {ERROR_AUTH, SUCCESS_AUTH, LOADING_AUTH, RESET_AUTH, GET_USER} from "../../constants";
import HttpClient from '../../api';
import {getStringWithFilteredSpace} from '../../utils/common'
import {AUTH_ERROR, IUserAPIUserData} from "../../api/types/user";
import {setItem} from "../../utils/localStorage";
import {Use} from "react-native-svg";

export interface Credentials {
    refresh_token: string;
    token: string;
}

const errorText: Record<keyof typeof AUTH_ERROR, string> = {
    UNAUTHORIZED: `Неверный логин или пароль. Попробуйте ещё раз.`,
    UNKNOW: "Неизвестная ошибка обратитесь в службу подержки."
}


export const reset = () => (
    {
        type: RESET_AUTH
    }
)


const getErrorAuth = (status: number | undefined) => {
    if(status) {
        return status === 401 ? errorText["UNAUTHORIZED"] : errorText["UNKNOW"]
    }
    return errorText["UNKNOW"]
}


const fetchCurrentUser = async (dispatch: AppDispatch) => {
    try {
        const user = await HttpClient.get<IUserAPIUserData>('/users/me')
        if(user){
            dispatch({
                type: SUCCESS_AUTH
            })
            dispatch({
                type: GET_USER,
                payload: user.data
            })
            return Promise.resolve()
        }
    } catch (e: any) {
      /*  this.logout(); */
        console.log(e?.response, 'currentUser')
        dispatch({
            type: ERROR_AUTH,
            message: "Что то пошло не так!"
        })
        return Promise.reject(e)
    }
}

export const auth = (login: string, password: string) => async (dispatch: AppDispatch) => {
    console.log('auth');
    try {
        dispatch({
            type: LOADING_AUTH
        })
        const { data } = await HttpClient.post<Credentials>('/authentication_token', {
            login: getStringWithFilteredSpace(login),
            password,
        });
        setItem('token', data)
        return await fetchCurrentUser(dispatch)
    } catch (e: any) {
        dispatch({
           type: ERROR_AUTH,
           message: getErrorAuth(e?.response?.status)
       })
        return Promise.reject(e)
    }
}