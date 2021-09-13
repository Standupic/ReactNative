import { Middleware } from "redux";
import { RootState } from '../../store'
import {ERROR, SUCCESS, LOADING} from "../../constants";
import ICrudHttp from '../../src/api';

interface IRequest {
    type: string,
    url: string,
    data?: Record<string, any>,
}

export const auth: Middleware<{}, RootState> = state => next => async (action: IRequest) => {
    const { type, url, data } = action
    next({
        type: type
    })
    next({
        type: LOADING
    })
}