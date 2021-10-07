import {StyleSheet, Text, View, Pressable} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import { useNavigation } from '@react-navigation/native';

const HeaderCurrentIssuerPoint = () => {
    const issuers = useSelector((state: RootState) => state.issuers.currentIssuer)
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={() => {
            navigation.navigate('IssuerPoints')
            navigation.setOptions({tabBarVisible: false})
            }
        }>
            <Text style={styles.title}>Филиал</Text>
            <Text style={styles.description}>{(issuers) ? `${issuers.name}` : "Точка не указана!"}</Text>
        </Pressable>
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

export default HeaderCurrentIssuerPoint