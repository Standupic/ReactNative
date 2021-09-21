import React from "react";
import TextInput from "./TextInput";
import {View} from "react-native";

const LoginForm = () => {
    return(
       <View>
           <TextInput
               label="Логин"
               name='login'
               autoCapitalize='none'
           />
           <TextInput
               label="Пароль"
               name='password'
               autoCapitalize='none'/>
       </View>
    )
}

export default LoginForm
