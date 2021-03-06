import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StackNavigationProp } from '@react-navigation/stack'
type Props = Partial<StackNavigationProp<any>>

const BackButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.goBack} style={styles.container}>
        <Image
            style={styles.image}
            source={require("../assets/arrow_back.png")}
        />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        left: 4,
    },
    image: {
        width: 24,
        height: 24,
    },
});

export default BackButton