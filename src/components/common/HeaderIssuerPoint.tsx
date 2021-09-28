import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const HeaderIssuerPoint = () => {
    const issuers = useSelector((state: RootState) => state.user.currentIssuer)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Филиал</Text>
            <Text style={styles.description}>{(issuers) ? `${issuers.name}` : "Точка не указана!"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
       fontWeight: 'bold'
    },
    description: {
        fontSize: 12
    }    
})

export default HeaderIssuerPoint