import {StyleSheet, Text, View, Pressable} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import { useNavigation } from '@react-navigation/native';
import VoucherSlice from "../../../reducer/voucher";

const HeaderCurrentIssuerPoint = () => {
    const dispatch = useDispatch()
    const issuers = useSelector((state: RootState) => state.issuers.currentIssuer)
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={() => {
            navigation.navigate('IssuerPoints')
            navigation.setOptions({tabBarVisible: false})
            dispatch(VoucherSlice.actions.resetPagination())
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