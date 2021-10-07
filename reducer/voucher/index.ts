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
    total: number | null
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
        total: null
    }
}


export const getVouchers = createAsyncThunk(
    'voucher/list',
    async (params: any, thunkAPI) => {
        const {data, headers} = await HttpClient.get<VoucherInterface[]>('/vouchers', {
            params: {
                ...params
            }
        });
        console.log(headers['x-total-count'], 'headers');
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
        thunkAPI.dispatch(VoucherSlice.actions.setVouchers(
            { data: vouchers, total: headers['x-total-count'] }))
    }
)

const VoucherSlice = createSlice({
    name: 'voucher',
    initialState: INITIAL_STATE,
    reducers: {
        setVouchers: (state, action:PayloadAction<{data: IVoucherList[], total: number}>) => {
            const {page, limit, total} = state.pagination
            if(page === 1){
                console.log('1')
                state.vouchers = action.payload.data
            }else{
                console.log('2')
                console.log(page)
                console.log(total)
                if(total){
                    console.log(Math.ceil(total/limit), "stage")
                }
                if(state.vouchers && page < Math.ceil((total ? total/limit : 0))){
                    state.vouchers = state.vouchers?.concat(action.payload.data)
                }
            }
        },
        incrementPagination: (state, action:PayloadAction<number>) => {
             state.pagination.page+=action.payload
        },
        closeModalError: (state, action) => {
            state.activityIndicator = INITIAL_STATE_ACTIVITY_INDICATOR
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getVouchers.fulfilled, 
            (state:IInitialState, action: PayloadAction<any>) => { // TODO type payload
            state.activityIndicator.success = true
            state.activityIndicator.isLoading = false
            state.pagination.total = action.payload.total
        })
        builder.addCase(getVouchers.pending,
            (state:IInitialState, action) => {
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

export const selectPage = (state: RootState) => state.vouchers.pagination.page;

export const selectVouchers = (state: RootState) => state.vouchers.vouchers;

export const selectActivityIndicatorVoucher = (state: RootState) => state.vouchers.activityIndicator;

// END SELECTORS


export default VoucherSlice
