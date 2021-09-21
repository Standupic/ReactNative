import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import {loginValidator, passwordValidator} from '../helpers/formValidation';
import {StackScreenProps} from "@react-navigation/stack";
import Header from '../components/Header';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {theme} from '../core/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../store";
import Actions from '../../actions'
import {auth} from "../../actions/auth";
import { Formik } from 'formik';
import LoginForm from "../components/LoginForm";

interface IValues {
    password: string,
    login: string,
}

const initialValues: IValues = {
    password: '',
    login: ''
} 

type Props = StackScreenProps<{[key:string]: any}, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
    const authState = useSelector((state: RootState) => state.auth)
    const {success} = authState
    const dispatch = useDispatch()
    
    const onSubmit = async (values: IValues) => {
        await dispatch(auth(values.login, values.password))
        if(success){
            navigation.navigate("ResetPasswordScreen")
        }
    }

    const validate = (values: any) => {
        console.log(values)
        const error: any = {}
        if(!values.login){
            error.login = "Заполните поле"
        }
        if(!values.password){
            error.password = "Заполните поле"
        }
        return error
    }
    return (
    <Background>
      <Logo />
        <Formik<IValues> initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            {({handleSubmit}) => {
                return (
                   <View style={styles.container}>
                       <LoginForm />
                       <Button mode="contained" onPress={handleSubmit}>Login</Button>
                   </View>
                )
            }}
        </Formik>
    </Background>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
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