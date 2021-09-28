import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import HttpClient from "../../api";
import {getStringWithFilteredSpace} from "../../utils/common";
import {setItem} from "../../utils/localStorage";
import {IUserAPIUserData} from "../../api/types/user";

interface IInitialState {
    isLoading: boolean,
    success: boolean,
    error: boolean,
    message: string | undefined,
}

const INITIAL_STATE: IInitialState = {
    isLoading: false,
    success: false,
    error: false,
    message: undefined
}

interface Credentials {
    login: string,
    password: string
}

export interface UserSettings {
    activeRefundOfficeId: string | null;
    activeIssuerId: string | null;
}

export const signInAuth = createAsyncThunk(
    'user/auth',
    async (credentials: Credentials, thunkAPI) => {
        const { login , password } = credentials
        const { data } = await HttpClient.post<Credentials>('/authentication_token', {
            login: getStringWithFilteredSpace(login), 
            password,
        });
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
            state = INITIAL_STATE
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInAuth.fulfilled, (state, action) => {
            state.success = true
            state.isLoading = false
        })
        builder.addCase(signInAuth.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signInAuth.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.message = action.error.message
        })
    }
})    

export default AuthSlice;