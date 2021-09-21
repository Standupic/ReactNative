import React from "react";
import {ActivityIndicator, StyleSheet, View, ActivityIndicatorProps} from "react-native";

interface Props {
     size: ActivityIndicatorProps['size']
}

const IndicatorActivity = (props: Props) => (
     <View style={styles.container}>
          <ActivityIndicator size={props.size} color={"green"}/>
     </View>   
)

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
     }
})

export default IndicatorActivity