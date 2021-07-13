import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import {emailValidator} from '../helpers/formValidation';
import BackButton from '../components/BackButton';
import {StackScreenProps} from '@react-navigation/stack';
import Header from '../components/Header';

type Props = StackScreenProps<{[key:string]: any}, 'ResetPasswordScreen'>;

export default function ResetPasswordScreen({navigation}: Props) {
    const [email, setEmail] = useState({value: '', error: ''})
    const onSubmitPressed = () => {
        const emailError = emailValidator(email.value);
        if(emailError){
            setEmail({...email, error: emailError})
        }
    }
    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Logo />
            <Header>Restore Password</Header>
            <TextInput
                value={email.value}
                errorText={email.error}
                error={!!email.error}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                label="Email"
                description="You will receive email with password reset link."
            />
            <Button mode="contained" onPress={onSubmitPressed}>Send Instuctions</Button>
        </Background>
    )    
}

