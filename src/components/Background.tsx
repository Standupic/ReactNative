import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { theme } from '../core/theme'
import StatusBar from "./StatusBar";

const Background: React.FunctionComponent = (props) => {
  return (
      <View style={styles.background}>
        <StatusBar>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
              {props.children}
          </KeyboardAvoidingView>
        </StatusBar>  
      </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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