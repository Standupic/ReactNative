import React, {useEffect} from "react";
import {SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList, ListRenderItem} from "react-native";
import {getVouchers} from "../../../reducer/voucher";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {activeIssuerId, selectActiveIssuerId} from "../../../reducer/user";
import store from "../../../store";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

type ItemProps = {
    title: string
}

const Item = ({ title } : ItemProps) => (
    <View style={styles.item}>
        <View style={styles.itemTop}>
            <View>
                <Text>{"№ 1231312"}</Text>
                <Text>{"Дата: 23.04.03"}</Text>
            </View>
            <View>
                <Text>{"Обработан"}</Text>
            </View>
        </View>
        <View style={styles.heading}>
            <View>
                <Text>{"Сумма покупок"}</Text>
                <Text>{"10000"}</Text>
            </View>
            <View>
                <Text>{"НДС"}</Text>
                <Text>{"600"}</Text>
            </View>
            <View>
                <Text>{"К возрату"}</Text>
                <Text>{"1284"}</Text>
            </View>
        </View>
    </View>
);


const VoucherList = () => {
    const dispatch = useDispatch()
    const currentIssuerId = useSelector(activeIssuerId)
    
    console.log(currentIssuerId, 'currentIssuerId')
    const getVouchersList = async () => {
        return dispatch(getVouchers({params: {['issuer.id']: currentIssuerId}}));
        
    }
    
    useEffect(() => {
        console.log(getVouchersList())
    })
    
    const renderItem: ListRenderItem<{id: string, title: string}> | null | undefined = 
        ({ item }) => (
            <Item title={item.title} />
        );
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "white",
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