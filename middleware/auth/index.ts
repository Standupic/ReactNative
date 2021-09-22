import {AppDispatch} from "../../store";
import {ERROR_AUTH, LOADING_AUTH} from "../../constants";
import HttpClient from "../../api";
import {getStringWithFilteredSpace} from "../../utils/common";
import {setItem} from "../../utils/localStorage";
import {Credentials} from "../types";
import {fetchCurrentUser} from "../user";
import {getErrorAuth} from "../../helpers";

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