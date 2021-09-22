import {AppDispatch} from "../../store";
import HttpClient from "../../api";
import {IUserAPIUserData} from "../../api/types/user";
import {ERROR_AUTH, GET_USER, SUCCESS_AUTH} from "../../constants";

export const fetchCurrentUser = async (dispatch: AppDispatch) => {
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