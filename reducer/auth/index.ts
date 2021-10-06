import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {getStringWithFilteredSpace} from "../../utils/common";
import {setItem} from "../../utils/localStorage";
import {IUserAPIUserData} from "../../api/types/user";
import {ActivityIndicator} from "../../api/types/common";
import {INITIAL_STATE_ACTIVITY_INDICATOR} from "../const";
import {RootState} from "../../store";

interface IInitialState {
    activityIndicator: ActivityIndicator
}

const INITIAL_STATE: IInitialState = {
    activityIndicator: INITIAL_STATE_ACTIVITY_INDICATOR,
}

interface token {
    token: string,
    refreshToken: string
}

interface Credentials {
    login: string,
    password: string
}

export interface UserSettings {
    activeIssuerId: string | null;
}


export const signInAuth = createAsyncThunk(
    'user/auth',
    async (credentials: Credentials, thunkAPI) => {
        const { login , password } = credentials
        const { data } = await HttpClient.post<token>('/authentication_token', {
            login: getStringWithFilteredSpace(login), 
            password,
        });
        console.log(data.token, 'TOKEN')
        setItem('token', data)
        const [user, settings] = await Promise.all([
            HttpClient.get<IUserAPIUserData>('/users/me'),
            HttpClient.get<UserSettings>('/settings', {
                params: {
                    name: ['activeIssuerId'],
                },
            }),
        ]);
        return { user: user.data, settings: settings.data }
    }
)
    
const AuthSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        logOut(state, action) {
            state.activityIndicator = INITIAL_STATE_ACTIVITY_INDICATOR
            state.activityIndicator.message = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInAuth.fulfilled,
            (state:IInitialState, action) => {
            state.activityIndicator.success = true
            state.activityIndicator.isLoading = false
        })
        builder.addCase(signInAuth.pending,
            (state:IInitialState, action ) => {
            state.activityIndicator.isLoading = true
        })
        builder.addCase(signInAuth.rejected,
            (state:IInitialState, action) => {
            state.activityIndicator.isLoading = false
            state.activityIndicator.error = true
            state.activityIndicator.message = action.error.message
        })
    }
})


// SELECTORS

export const selectActivityIndicatorAuth = (state: RootState) => state.auth.activityIndicator;

// END SELECTOR


export default AuthSlice;