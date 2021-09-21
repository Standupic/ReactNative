import { Middleware } from "redux";
import { AppDispatch } from '../../store'
import {ERROR, SUCCESS, LOADING} from "../../constants";
import HttpClient from '../../api';
import {AnyAction} from "redux";
import {getStringWithFilteredSpace} from '../../utils/common'
import {AUTH_ERROR, IUserAPIUserData} from "../../api/types/user";
import {setItem, getItem} from "../../utils/localStorage";


export interface Credentials {
    refresh_token: string;
    token: string;
}

const errorText: Record<keyof typeof AUTH_ERROR, string> = {
    UNAUTHORIZED: "Неверный логин или пароль. Попробуйте ещё раз.",
    UNKNOW: "Неизвестная ошибка обратитесь в службу подержки."
}

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
                type: SUCCESS
            }) 
        }
    } catch (e) {
      /*  this.logout(); */
        console.log(e?.response, 'currentUser')
        dispatch({
            type: ERROR,
            message: "Что то пошло не так!"
        })
    }
}

export const auth = (login: string, password: string) => async (dispatch: AppDispatch) => {
    console.log('auth');
    try {
        dispatch({
            type: LOADING
        })
        const { data } = await HttpClient.post<Credentials>('/authentication_token', {
            login: getStringWithFilteredSpace(login),
            password,
        });
        setItem('token', data)
        return await fetchCurrentUser(dispatch)
    } catch (e) {
        console.log(e?.response)
        dispatch({
           type: ERROR,
           message: getErrorAuth(e?.response?.status)
       })
    }
}