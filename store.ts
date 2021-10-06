import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './reducer/auth'
import UserSlice from './reducer/user'
import NetSlice from './reducer/net'
import VoucherSlice from './reducer/voucher';
import IssuersSlice from "./reducer/issuers";


export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        user: UserSlice.reducer,
        net: NetSlice.reducer,
        vouchers: VoucherSlice.reducer,
        issuers: IssuersSlice.reducer 
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch