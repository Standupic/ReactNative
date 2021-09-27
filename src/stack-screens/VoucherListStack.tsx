import React, {Component, ReactNode} from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import HeaderIssuerPoint from "../../src/components/common/HeaderIssuerPoint";
import StartScreen from "../screens/StartScreen";
import Logo from "../components/Logo";
import {View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

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
                component={StartScreen}
                options={{
                    headerTitle: "Список ваучеров",
                    headerRight: HeaderIssuerPoint,
                    headerLeft: LogoMenu
                }}
            />
            {/* other screens */}
        </VoucherListStackScreen.Navigator>
    );
}



export default VoucherListStack