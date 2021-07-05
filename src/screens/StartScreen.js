import React from 'react'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Background from '../components/Background'
import Logo from '../components/Logo'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button mode="outlined">Login</Button>
      <Button mode="contained">Sign up</Button>
    </Background>
  )
}
