import React from 'react'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Background from '../components/Background'
import Logo from '../components/Logo'
import { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<{[key:string]: any}, 'StartScreen'>;

export default function StartScreen({ navigation }: Props) {
  return (
    <Background>
      <Logo viewBox={"0 0 180 40"}/>
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.push('LoginScreen')
        }}
      >
        Login
      </Button>
      <Button mode="contained" onPress={() => {
          navigation.navigate('RegisterScreen')
      }}>Sign up</Button>
    </Background>
  )
}
