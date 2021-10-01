import {createAsyncThunk} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {getStringWithFilteredSpace} from "../../utils/common";
import {setItem} from "../../utils/localStorage";
import {IUserAPIUserData} from "../../api/types/user";
import {UserSettings} from "../auth";

interface IInitialState {
    isLoading: boolean,
    success: boolean,
    error: boolean,
    message: string | undefined,
}

const INITIAL_STATE: IInitialState = {
    isLoading: false,
    success: false,
    error: false,
    message: undefined
}


export const getVouchers = createAsyncThunk(
    'user/auth',
    async (params: Record<any, any>) => {
        const { data } = await HttpClient.post<token>('/vouchers', {
            login: getStringWithFilteredSpace(login),
            password,
        });
    }
)

