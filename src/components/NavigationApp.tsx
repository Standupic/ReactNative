import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from '../../src/screens/LoginScreen';
import HomeTabs from "../tabs";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {createStackNavigator} from "@react-navigation/stack";
import StatusConnection from "./common/StatusConnection";
const RootStack = createStackNavigator()


const NavigationApp = () => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    const isConnected = useSelector((state: RootState) => state.net.isConnected)
    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {!user &&
                    <RootStack.Screen name="LoginScreen" component={LoginScreen}/> }
                {user && isConnected &&     
                    <RootStack.Screen 
                        name="VoucherListStack"
                        component={HomeTabs}
                    />
                }
                {user && !isConnected &&
                    <RootStack.Screen
                        name="StatusConnection"
                        component={StatusConnection}
                    />
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationApp