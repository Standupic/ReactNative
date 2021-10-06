import {createSelector, createSlice} from "@reduxjs/toolkit";
import {IssuerPointAPI} from "../../api/types/issuers";
import {ActivityIndicator} from "../../api/types/common";
import AuthSlice, {signInAuth} from "../auth";
import {getCurrentIssuer} from "../user/utils";
import {RootState} from "../../store";
import {INITIAL_STATE_ACTIVITY_INDICATOR} from "../const";

interface IInitialState {
    activeIssuerId: string | null
    issuers:  IssuerPointAPI[] | undefined,
    activityIndicator: ActivityIndicator,
    currentIssuer: IssuerPointAPI | undefined
    
}

const INITIAL_STATE: IInitialState = {
    activityIndicator: INITIAL_STATE_ACTIVITY_INDICATOR,
    activeIssuerId: null,
    issuers: undefined,
    currentIssuer: undefined
}

const IssuersSlice = createSlice({
    name: 'issuers',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInAuth.fulfilled, (state, action) => {
            const {user, settings} = action.payload
            const {issuers} = user
            state.issuers = issuers
            state.activeIssuerId = action.payload.settings.activeIssuerId
            state.currentIssuer = getCurrentIssuer(issuers, settings.activeIssuerId)
        })
        builder.addCase(AuthSlice.actions.logOut, (state, action) => {
            return INITIAL_STATE
        })
    }
})


// SELECTORS

export const selectActiveIssuerId = (state: RootState) => state.user.activeIssuerId;

export const activeIssuerId = createSelector(selectActiveIssuerId, (activeIssuerId) => {
    return activeIssuerId;
})

// END SELECTORS

export default IssuersSlice