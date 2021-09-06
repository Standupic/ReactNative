import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { Provider as ProviderPaper } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import StatusConnection from "./src/components/StatusBar";
import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import store from './store';
const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
        <ProviderPaper>
            <NavigationContainer>
              <Stack.Navigator
                  initialRouteName="LoginScreen"
                  screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
              </Stack.Navigator>
            </NavigationContainer>
      </ProviderPaper>
    </Provider>
  )
}
