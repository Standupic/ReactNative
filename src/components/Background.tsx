import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'


const Background: React.FunctionComponent = (props) => {
  return (
      <View style={styles.background}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {props.children}
        </KeyboardAvoidingView>
      </View>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.tint,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Background;