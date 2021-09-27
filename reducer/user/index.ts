import {ERROR_AUTH, GET_USER, SUCCESS_AUTH} from "../../constants";
import {IUserAPIUserData} from "../../api/types/user";
import {IssuerPointAPI} from "../../api/types/issuers";
import {createReducer, createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import HttpClient from "../../api";

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

type ACTION_TYPE = 
    | {
        type: typeof GET_USER
        payload: IUserAPIUserData
       }


const fetchUser = createAsyncThunk(
    'users/fetch',
    async (_, thunkAPI) => {
        const user = await HttpClient.get<IUserAPIUserData>('/users/me')
        return user.data
    }
)       
       
const get_user = createAction<IUserAPIUserData>('user/get_user')
       
const User = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [`${fetchUser.fulfilled}`]: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})
// const User = (state = INITIAL_STATE, action: ACTION_TYPE) => {
//     switch (action.type){
//         case GET_USER:
//             const {issuers} = action.payload
//             return {
//                 ...state,
//                 currentUser: action.payload,
//                 hasToken: true,
//                 issuers: issuers,
//             }
//         default:
//             return state
//
//     }
// }

export default User