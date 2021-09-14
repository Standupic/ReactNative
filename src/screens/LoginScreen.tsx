import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import {loginValidator, passwordValidator} from '../helpers/formValidation';
import {StackScreenProps} from "@react-navigation/stack";
import Header from '../components/Header';
import {StyleSheet, Text} from 'react-native';
import {theme} from '../core/theme';
import {useDispatch, useSelector} from 'react-redux';
import {State} from "../../reducer/types";
import Actions from '../../actions'
import {auth} from "../../actions/auth";

type Props = StackScreenProps<{[key:string]: any}, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
    const counter = useSelector((state: State) => state.counter)
    const dispatch = useDispatch()
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({ value: '', error: '' })
    const onLoginPressed = () => {
        const emailError = loginValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
        }
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
        }
        
        dispatch(auth(email.value, password.value))
    }
    
    return (
    <Background>
      {/*<BackButton goBack={navigation.goBack}/>*/}
      <Logo />
      <Header>Войти</Header>
      <TextInput 
          label="Email"
          value={email.value}
          errorText={email.error}
          error={!!email.error}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
      />
      <TextInput
          label="Password" 
          value={password.value}
          error={!!password.error}
          errorText={password.error} 
          onChangeText={(text) => setPassword({ value: text, error: "" })}/>
        <Button mode="contained" onPress={onLoginPressed}>Login</Button>
        <Button mode="contained" onPress={() => {dispatch(Actions.increment())}}>Increment</Button>
        <Text>{counter}</Text>
        {/* <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
                <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
        </View>*/}
    </Background>
  )
}

const styles = StyleSheet.create({
    forgotPassword: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontWeight: 'bold',
        color: theme.colors.primary
    },
});

export default LoginScreen