import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList, ActivityIndicator} from "react-native";
import VoucherSlice, {
    getVouchers,
    IVoucherList,
    selectActivityIndicatorVoucher, selectPagination,
    selectVouchers
} from "../../reducer/voucher";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {selectActiveIssuerId} from "../../reducer/issuers";
import ModalError from "../components/common/ModalError";

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


const VoucherListScreen = () => {
    const dispatch = useDispatch()
    const currentIssuerId = useSelector(selectActiveIssuerId)
    const vouchers = useSelector(selectVouchers)
    const pagination = useSelector(selectPagination)
    const activityIndicator = useSelector(selectActivityIndicatorVoucher)
    const {error, isLoading, message} = activityIndicator
    const getVouchersList = useCallback(async () => {
        return dispatch(getVouchers({
                ['issuer.id']: currentIssuerId,
            }
        ));
    },[currentIssuerId])
    
    useEffect(() => {
        getVouchersList()
        return () => {
            dispatch(VoucherSlice.actions.resetPagination()) 
        }
    },[currentIssuerId])
        
    
    const onRefresh = useCallback(() => {
        dispatch(VoucherSlice.actions.resetPagination())
    },[])
    
    const onEndReached = useCallback(() => {
        if(pagination.numberPages === null || pagination.page < pagination.numberPages){
            dispatch(VoucherSlice.actions.incrementPagination(1))
            getVouchersList()
        }
    },[pagination.page])
    
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
    if(error) {
        return (
            <ModalError 
                isVisible={error} 
                message={message}
                action={VoucherSlice.actions.closeModalError}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                refreshing={isLoading}
                onRefresh={onRefresh}
                data={vouchers}
                renderItem={renderItem} 
                keyExtractor={item => item.hrIdentifier}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
                />
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

export default VoucherListScreen