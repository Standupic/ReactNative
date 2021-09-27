import React, {useEffect} from "react";
import NetInfo from "@react-native-community/netinfo";
import {useDispatch} from "react-redux";
import {is_connect} from "../actions/net";

const useStatusConnect = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const subscription = NetInfo.addEventListener((state) => {
            dispatch(is_connect(state.isConnected))
        })
        return (
            subscription
        )
    })
}
export default useStatusConnect