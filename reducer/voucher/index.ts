import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {VoucherInterface} from "../../api/types/voucher";
import {RootState} from "../../store";

interface IInitialState {
    isLoading: boolean,
    success: boolean,
    error: boolean,
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
    isLoading: false,
    success: false,
    error: false,
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

// SELECTORS

export const selectVouchers = (state: RootState) => state.vouchers.vouchers;

// END SELECTORS


export default VoucherSlice
