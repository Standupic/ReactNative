import React, {Component, ReactNode} from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import HeaderCurrentIssuerPoint from "../../src/components/common/HeaderCurrentIssuerPoint";
import StartScreen from "../screens/StartScreen";
import Logo from "../components/Logo";
import {View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import VoucherList from "../screens/VouchersListScreen";
import ModalError from "../components/common/ModalError";
import AuthSlice from "../../reducer/auth";
import {selectActivityIndicatorVoucher} from "../../reducer/voucher";

const VoucherListStackScreen = createNativeStackNavigator();

const LogoMenu = () => {
    return (
        <View>
            <Logo width={100} viewBox={"0 0 200 20"}/>
        </View>
    )
}

const VoucherListStack = () => {
    const isConnected = useSelector((state: RootState) => state.net.isConnected)
    return (
        <VoucherListStackScreen.Navigator screenOptions={{headerShown: isConnected}}>
            <VoucherListStackScreen.Screen 
                name="VouchersListScreen"
                component={VoucherList}
                options={{
                    headerTitle: "",
                    headerRight: HeaderCurrentIssuerPoint,
                    headerLeft: LogoMenu
                }}
            />
            <VoucherListStackScreen.Screen 
                name={"IssuerPoints"}
                component={StartScreen}
            />
            {/* other screens */}
        </VoucherListStackScreen.Navigator>
    );
}



export default VoucherListStack