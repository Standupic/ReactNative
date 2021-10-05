import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {getStringWithFilteredSpace} from "../../utils/common";
import {setItem} from "../../utils/localStorage";
import {IUserAPIUserData} from "../../api/types/user";
import {UserSettings} from "../auth";
import {VoucherInterface} from "../../api/types/voucher";
import store from "../../store";

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

interface RequestParams {
    params: any
}


export const getVouchers = createAsyncThunk(
    'user/auth',
    async (params: RequestParams) => {
        console.log(params, 'params');
        const { data } = await HttpClient.get<VoucherInterface[]>('/vouchers', {
            params: {
                ...params.params
            }
        });
        return data.reduce((acc, voucher) => {
           return {...acc, 
                hrIdentifier: voucher.hrIdentifier,
                status: voucher.status,
                date: voucher.issuedAt,
                total: voucher.totalAmount,
                nds: voucher.taxationAmount,
                refund: voucher.refundableAmount
            } 
        },[])
    }
)

const VoucherSlice = createSlice({
    name: 'voucher',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVouchers.fulfilled, 
            (state:IInitialState, action) => {
            state.success = true
        })
        builder.addCase(getVouchers.pending,
            (state:IInitialState, action) => {
            state.isLoading = true
        })
        builder.addCase(getVouchers.rejected,
            (state:IInitialState, action) => {
                state.error = true
                state.message = action.error.message
        })
    }
})
