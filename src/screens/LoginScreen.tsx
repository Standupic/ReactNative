import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import {emailValidator, passwordValidator} from '../helpers/formValidation';
import BackButton from '../components/BackButton';
import {StackScreenProps} from "@react-navigation/stack";
import Header from '../components/Header';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../core/theme';

type Props = StackScreenProps<{[key:string]: any}, 'LoginScreen'>;

export default function LoginScreen({navigation}: Props) {
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({ value: '', error: '' })
    const onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
        }
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
        }
    }
    return (
    <Background>
      <BackButton goBack={navigation.goBack}/>
      <Logo />
      <Header>Sing in</Header>
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
        <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
                <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
        </View>
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