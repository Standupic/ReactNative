import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StartScreen from "../screens/StartScreen";
const BottomMenu = createBottomTabNavigator()

const HomeTabs = () => {
    return (
        <BottomMenu.Navigator>
            <BottomMenu.Screen name="CreateVoucher" component={StartScreen} />
            <BottomMenu.Screen name="Profile" component={StartScreen} />
            <BottomMenu.Screen name="Points" component={StartScreen} />
            <BottomMenu.Screen name="SignOut" component={StartScreen} />
        </BottomMenu.Navigator>
    );
}

export default HomeTabs