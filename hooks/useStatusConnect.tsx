import React, {useEffect} from "react";
import NetInfo from "@react-native-community/netinfo";
import {useDispatch} from "react-redux";
import NetSlice from "../reducer/net";

const useStatusConnect = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const subscription = NetInfo.addEventListener((state) => {
            dispatch(NetSlice.actions.isConnect)
        })
        return (
            subscription
        )
    })
}
export default useStatusConnect