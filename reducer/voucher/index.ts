import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {VoucherInterface} from "../../api/types/voucher";
import {RootState} from "../../store";
import {ActivityIndicator} from "../../api/types/common";
import AuthSlice from "../auth";
import {INITIAL_STATE_ACTIVITY_INDICATOR} from "../const";

interface IInitialState {
    activityIndicator: ActivityIndicator
    message: string | undefined,
    vouchers: IVoucherList[] | null
}

export interface IVoucherList {
    hrIdentifier: string,
    status: string,
    date: string,
    total: string,
    nds: string,
    refund: string
}

const INITIAL_STATE: IInitialState = {
    activityIndicator: INITIAL_STATE_ACTIVITY_INDICATOR,
    message: undefined,
    vouchers: null
}


export const getVouchers = createAsyncThunk(
    'voucher/list',
    async (params: any, thunkAPI) => {
        const {data} = await HttpClient.get<VoucherInterface[]>('/vouchers', {
            params: {
                ...params
            }
        });
        const vouchers = data.reduce((acc: any, voucher) => {
            return [...acc, {
                hrIdentifier: voucher.hrIdentifier,
                status: voucher.status,
                date: voucher.issuedAt,
                total: voucher.totalAmount,
                nds: voucher.taxationAmount,
                refund: voucher.refundableAmount
            }]
        }, [])
        thunkAPI.dispatch(VoucherSlice.actions.setVouchers(vouchers))
    }
)

const VoucherSlice = createSlice({
    name: 'voucher',
    initialState: INITIAL_STATE,
    reducers: {
        setVouchers: (state, action:PayloadAction<IVoucherList[]>) => {
            state.vouchers = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getVouchers.fulfilled, 
            (state:IInitialState, action) => {
            state.activityIndicator.success = true
            state.activityIndicator.isLoading = false
                
        })
        builder.addCase(getVouchers.pending,
            (state:IInitialState, action) => {
            state.activityIndicator.isLoading = true
        })
        builder.addCase(getVouchers.rejected,
            (state:IInitialState, action) => {
                state.activityIndicator.error = true
                state.message = action.error.message
        })
        builder.addCase(AuthSlice.actions.logOut, (state, action) => {
            return INITIAL_STATE
        })
    }
})

// SELECTORS

export const selectVouchers = (state: RootState) => state.vouchers.vouchers;

export const selectActivityIndicator = (state: RootState) => state.vouchers.activityIndicator;

// END SELECTORS


export default VoucherSlice
