import {IUserAPIUserData} from "../../api/types/user";
import {IssuerPointAPI} from "../../api/types/issuers";
import {createSlice} from "@reduxjs/toolkit";
import AuthSlice, {signInAuth} from '../auth'
import {getCurrentIssuer} from "./utils";
import { createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../store";

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
            const {user, settings} = action.payload
            const {issuers} = user
            state.hasToken = true
            state.currentUser = action.payload.user
            state.currentIssuer = getCurrentIssuer(issuers, settings.activeIssuerId)
            state.activeIssuerId = action.payload.settings.activeIssuerId
        })
        builder.addCase(AuthSlice.actions.logOut, (state, action) => {
            state = INITIAL_STATE
        })
    }
})

// SELECTORS

export const selectActiveIssuerId = (state: RootState) => state.user.activeIssuerId;

export const activeIssuerId = createSelector(selectActiveIssuerId, (activeIssuerId) => {
    console.log(activeIssuerId, 'activeIssuerId');
    return activeIssuerId;
})

// END SELECTORS

export default UserSlice