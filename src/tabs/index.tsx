import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StartScreen from "../screens/StartScreen";
import VoucherListStack from "../stack-screens/VoucherListStack";
const BottomMenu = createBottomTabNavigator()

const HomeTabs = () => {
    return (
        <BottomMenu.Navigator>
            <BottomMenu.Screen 
                name="Ваучеры"
                component={VoucherListStack}
                />
            <BottomMenu.Screen name="Создать" component={StartScreen} />
            <BottomMenu.Screen name="Профиль" component={StartScreen} />
            <BottomMenu.Screen name="Выйти" component={StartScreen}  />
        </BottomMenu.Navigator>
    );
}

export default HomeTabs