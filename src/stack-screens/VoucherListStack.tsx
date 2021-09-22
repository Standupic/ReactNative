import React from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import VouchersListScreen from "../screens/VouchersListScreen";

const VoucherListStackScreen = createNativeStackNavigator();

const VoucherListStack = () => {
    return (
        <VoucherListStackScreen.Navigator>
            <VoucherListStackScreen.Screen name="VouchersListScreen" component={VouchersListScreen} />
            {/* other screens */}
        </VoucherListStackScreen.Navigator>
    );
}

export default VoucherListStack