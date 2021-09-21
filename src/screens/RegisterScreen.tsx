import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import {emailValidator, passwordValidator, loginValidator} from '../helpers/formValidation';
import BackButton from '../components/BackButton';
import {StackScreenProps} from '@react-navigation/stack';
import Header from '../components/Header';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {theme} from '../core/theme';

type Props = StackScreenProps<{[key:string]: any}, 'RegisterScreen'>;

export default function RegisterScreen({navigation}: Props) {
    const [name, setName] = useState({value: '', error: ''})
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({ value: '', error: '' })
    const onSignUpPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const nameError = loginValidator(name.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setName({ ...name, error: nameError })
            return;
        }
    }
    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Logo />
            <Header>Create Account</Header>
            <TextInput
                label="Name"
                value={name.value}
                errorText={name.error}
                error={!!name.error}
                onChangeText={(text) => setName({ value: text, error: "" })}
            />
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
                errorText={password.error}
                error={!!password.error}
                onChangeText={(text) => setPassword({ value: text, error: "" })}/>
            <Button mode="contained" onPress={onSignUpPressed}>Sing up</Button>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    row: {
       flexDirection: 'row',
       marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary
    },
});

