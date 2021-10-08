import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {VoucherInterface} from "../../api/types/voucher";
import {RootState} from "../../store";
import {ActivityIndicator} from "../../api/types/common";
import AuthSlice from "../auth";
import {INITIAL_STATE_ACTIVITY_INDICATOR} from "../const";


interface IPagination {
    page: number,
    limit: number,
    total: number | null,
    numberPages: number | null
}

interface IInitialState {
    activityIndicator: ActivityIndicator
    vouchers: IVoucherList[] | null
    pagination: IPagination
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
    vouchers: null,
    pagination: {
        page: 1,
        limit: 10,
        total: null,
        numberPages: null
    }
}

const INITIAL_PAGINATION: IPagination = {
    page: 1,
    limit: 10,
    total: null,
    numberPages: null
}

export const getVouchers = createAsyncThunk(
    'voucher/list',
    async (params: any, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const {data, headers} = await HttpClient.get<VoucherInterface[]>('/vouchers', {
            params: {
                _page:state.vouchers.pagination.page,
                limit:state.vouchers.pagination.limit,
                ...params,
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
        return thunkAPI.dispatch(VoucherSlice.actions.setVouchers(
            { data: vouchers, total: headers['x-total-count'] * 1}))
    }
)

const VoucherSlice = createSlice({
    name: 'voucher',
    initialState: INITIAL_STATE,
    reducers: {
        setVouchers: (state, action:PayloadAction<{data: any, total: number}>) => {
            state.pagination.total = action.payload.total
            state.pagination.numberPages = Math.ceil((action.payload.total / state.pagination.limit))
            const {page} = state.pagination
            if(page === 1) {
                state.vouchers = action.payload.data
            }else{
                if(state.vouchers){
                    state.vouchers = state.vouchers.concat(action.payload.data)
                }
            }
        },
        incrementPagination: (state, action:PayloadAction<number>) => {
            state.pagination.page += action.payload
        },
        resetPagination: (state) => {
            const {page, limit} = state.pagination;
            if(state.vouchers){
                state.vouchers = state.vouchers.slice(0, (limit*page) - ((limit*page) - limit))
            }
            state.pagination = INITIAL_PAGINATION
        },
        closeModalError: (state) => {
            state.activityIndicator = INITIAL_STATE_ACTIVITY_INDICATOR
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVouchers.fulfilled, 
            (state:IInitialState) => {
            state.activityIndicator.success = true
            state.activityIndicator.error = false    
            state.activityIndicator.isLoading = false
        })
        builder.addCase(getVouchers.pending,
            (state:IInitialState) => {
            state.activityIndicator.isLoading = true
        })
        builder.addCase(getVouchers.rejected,
            (state:IInitialState, action) => {
                state.activityIndicator.error = true
                state.activityIndicator.message = action.error.message
        })
        builder.addCase(AuthSlice.actions.logOut, (state, action) => {
            return INITIAL_STATE
        })
    }
})

// SELECTORS

export const selectPagination = (state: RootState) => state.vouchers.pagination;

export const selectVouchers = (state: RootState) => state.vouchers.vouchers;

export const selectActivityIndicatorVoucher = (state: RootState) => state.vouchers.activityIndicator;

// END SELECTORS


export default VoucherSlice
