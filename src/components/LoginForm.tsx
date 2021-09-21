import React from "react";
import TextInput from "./TextInput";
import {View} from "react-native";

const LoginForm = () => {
    return(
       <View>
           <TextInput
               label="Login"
               name='login'
               autoCapitalize='none'
           />
           <TextInput
               label="Password"
               name='password'
               autoCapitalize='none'/>
       </View>
    )
}

export default LoginForm
