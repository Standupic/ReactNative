import React, {useEffect, useState} from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import {StackScreenProps} from "@react-navigation/stack";
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {theme} from '../core/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../store";
import {auth} from "../../middleware/auth";
import {reset} from "../../actions/auth";
import { Formik } from 'formik';
import LoginForm from "../components/LoginForm";
import ModalError from "../components/common/ModalError";

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
    const [isVisible, setVisible] = useState<boolean>(false)
    const {success, error, message, isLoading} = authState
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(error) setVisible(true)
    },[error, dispatch, success])
    
    const onSubmit = async (values: IValues) => {
        await dispatch(auth(values.login, values.password))
    }

    const validate = (values: any) => {
        const error: any = {}
        if(!values.login){
            error.login = "Заполните поле"
        }
        if(!values.password){
            error.password = "Заполните поле"
        }
        return error
    }
    
    if(isLoading){
        return (
            <Background>
                <ActivityIndicator size={'large'} color={"green"}/>
            </Background>    
        )
    }
    if(error && isVisible) {
        return (
            <ModalError isVisible={isVisible} message={message} setVisible={setVisible} action={reset}/>
        )
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
    overlay: {
        position: "absolute",
        flex: 1,
        width: '100%',
        height: '100%', 
        left: 0,
        top: 0,
        opacity: 0.6,
        backgroundColor: "black"
    },
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