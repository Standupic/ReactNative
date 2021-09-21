import React from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native'
import StatusConnection from "./common/StatusConnection";
import {isIOS} from "./const";

const Background: React.FunctionComponent = (props) => {
  return (
      <View style={styles.background}>
        <StatusConnection>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView style={styles.container} behavior={isIOS ? "padding" : "height"}>
                {props.children}
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </StatusConnection>  
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