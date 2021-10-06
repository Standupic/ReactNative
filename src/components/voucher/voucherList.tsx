import React, {useEffect} from "react";
import {SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList, ActivityIndicator} from "react-native";
import {getVouchers, IVoucherList, selectActivityIndicator, selectVouchers} from "../../../reducer/voucher";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {selectActiveIssuerId} from "../../../reducer/issuers";

const Item = ({hrIdentifier, status, date, total, nds, refund}: IVoucherList) => (
    <View style={styles.item}>
        <View style={styles.itemTop}>
            <View>
                <Text>{`№ ${hrIdentifier}`}</Text>
                <Text>{`Дата: ${date}`}</Text>
            </View>
            <View>
                <Text>{`Cтатус: ${status}`}</Text>
            </View>
        </View>
        <View style={styles.heading}>
            <View>
                <Text>{"Сумма покупок"}</Text>
                <Text>{total}</Text>
            </View>
            <View>
                <Text>{"НДС"}</Text>
                <Text>{nds}</Text>
            </View>
            <View>
                <Text>{"К возрату"}</Text>
                <Text>{refund}</Text>
            </View>
        </View>
    </View>
);


const VoucherList = () => {
    const dispatch = useDispatch()
    const currentIssuerId = useSelector(selectActiveIssuerId)
    const vouchers = useSelector(selectVouchers)
    const activityIndicator = useSelector(selectActivityIndicator)
    const getVouchersList = async () => {
        return dispatch(getVouchers({['issuer.id']: currentIssuerId}));
    }
    useEffect(() => {
        console.log("effect")
        getVouchersList()
    },[currentIssuerId])
    const renderItem = ({item}: {item: IVoucherList}) => {
        return (
            <Item
                hrIdentifier={item.hrIdentifier}
                status={item.status}
                date={item.date}
                nds={item.nds}
                total={item.total}
                refund={item.refund}
            />
        )
    };
    return (
        <SafeAreaView style={styles.container}>
            {activityIndicator.isLoading ?
                <ActivityIndicator size={'large'} color={"#511D90"}/>
            :   
                <FlatList data={vouchers} renderItem={renderItem} keyExtractor={item => item.hrIdentifier}/>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: "center"
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "white",
        overflow: 'hidden'
    },
    title: {
        fontSize: 32,
    },
    itemTop: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "space-between",
        flexDirection: "row"
    },
    heading: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row"
    },
    sums: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row" 
    }
});

export default VoucherList