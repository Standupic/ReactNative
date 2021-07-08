import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'

export default function LoginScreen() {
  return (
    <Background>
      <Logo />
      <TextInput
        label="Email"
        onChangeText={() => {
          console.log('!')
        }}
      />
      <TextInput label="Password" />
      <Button mode="contained">Login</Button>
    </Background>
  )
}
