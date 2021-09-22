import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from '../../src/screens/LoginScreen';
import VoucherListStack from "../tabs";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {createStackNavigator} from "@react-navigation/stack";
const RootStack = createStackNavigator()

const NavigationApp = () => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {!user ?
                    <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
                    :
                    <RootStack.Screen name="VoucherListStack" component={VoucherListStack}/>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationApp