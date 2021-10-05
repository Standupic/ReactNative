import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
    message: undefined,
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
            state.isLoading = false
            state.error = false
            state.success = false
            state.message = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInAuth.fulfilled,
            (state:IInitialState, action) => {
            state.success = true
            state.isLoading = false
        })
        builder.addCase(signInAuth.pending,
            (state:IInitialState, action ) => {
            state.isLoading = true
        })
        builder.addCase(signInAuth.rejected,
            (state:IInitialState, action) => {
            state.isLoading = false
            state.error = true
            state.message = action.error.message
        })
    }
})    

export default AuthSlice;