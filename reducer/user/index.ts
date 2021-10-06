import {IUserAPIUserData} from "../../api/types/user";
import {IssuerPointAPI} from "../../api/types/issuers";
import {createSlice} from "@reduxjs/toolkit";
import AuthSlice, {signInAuth} from '../auth'

interface IInitialState {
    currentUser: IUserAPIUserData | null
    hasToken: boolean,
    issuers:  IssuerPointAPI[] | undefined,
    currentIssuer: IssuerPointAPI | undefined
    activeIssuerId: string | null
}

const INITIAL_STATE: IInitialState = {
    currentUser: null,
    hasToken: false,
    issuers: undefined,
    currentIssuer: undefined,
    activeIssuerId: null,
}


const UserSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInAuth.fulfilled, (state, action) => {
            state.hasToken = true
            state.currentUser = action.payload.user
        })
        builder.addCase(AuthSlice.actions.logOut, (state, action) => {
           return INITIAL_STATE
        })
    }
})

export default UserSlice