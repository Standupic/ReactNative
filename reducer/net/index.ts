import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    isConnected: boolean
}

const INITIAL_STATE: IInitialState = {
    isConnected: true
}

const NetSlice = createSlice({
    name: 'net',
    initialState: INITIAL_STATE,
    reducers: {
        isConnect(state, action){
            state.isConnected = true
        }
    },
})

export default NetSlice