import {IUserAPIUserData} from "../../api/types/user";
import {IssuerPointAPI} from "../../api/types/issuers";
import {createSlice} from "@reduxjs/toolkit";
import AuthSlice, {signInAuth} from '../auth'
import {getCurrentIssuer} from "./utils";


interface IInitialState {
    currentUser: IUserAPIUserData | null
    hasToken: boolean,
    issuers:  IssuerPointAPI[] | undefined,
    currentIssuer: IssuerPointAPI | undefined
}

const INITIAL_STATE: IInitialState = {
    currentUser: null,
    hasToken: false,
    issuers: undefined,
    currentIssuer: undefined
}

const UserSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInAuth.fulfilled, (state, action) => {
            const {user, settings} = action.payload
            const {issuers} = user
            state.hasToken = true
            state.currentUser = action.payload.user
            state.currentIssuer = getCurrentIssuer(issuers, settings.activeIssuerId )
        })
        builder.addCase(AuthSlice.actions.logOut, (state, action) => {
            state = INITIAL_STATE
        })
    }
})
export default UserSlice