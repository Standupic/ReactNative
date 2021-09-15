import { Middleware } from "redux";
import { AppDispatch } from '../../store'
import {ERROR, SUCCESS, LOADING} from "../../constants";
import HttpClient from '../../api';
import {AnyAction} from "redux";
import {getStringWithFilteredSpace} from '../../utils/common'
import {IUserAPIUserData} from "../../api/types/user";
import {setItem, getItem} from "../../utils/localStorage";

export interface Credentials {
    refresh_token: string;
    token: string;
}



const fetchCurrentUser = async (dispatch: AppDispatch) => {
    try {
        const user = await HttpClient.get<IUserAPIUserData>('/users/me')
       
      /*  dispatch({
            type: "CURRENT_USER",
            payload: user.data
        })*/
    } catch (e) {
      /*  this.logout(); */
        return Promise.reject(e);
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
        console.log(data)
        setItem('token', data)
        await fetchCurrentUser(dispatch)
    } catch (e) {
       dispatch({
           type: ERROR,
           message: "Что то пошло не так!"
       })
    }
}