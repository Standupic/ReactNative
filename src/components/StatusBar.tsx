import React, {ReactChild, ReactNode, useEffect, useState} from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";
import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import {connect} from "react-redux";

type Props = { children?: ReactNode}

const StatusConnection = ({children}: Props) => {
    const [isConnected , setConnect] = useState<NetInfoState['isConnected']>(true)
   
    useEffect(() => {
        const subscription = NetInfo.addEventListener((state) => {
            setConnect(state.isConnected)
        })
        return (
            subscription
        )
    })
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
        <StatusBar
            backgroundColor={backgroundColor}
            barStyle={'light-content'}
            animated={false}
        />
    );
    
    const messageContainer = (
        <View style={styles.messageContainer} pointerEvents={'none'}>
            {statusBar}
            {!isConnected && (
                <View style={styles.bubble}>
                    <Text style={styles.text}>No network connection</Text>
                </View>
            )}
        </View>
    );

    if(isConnected){
        return (
            <View>
                {children}
            </View>
            )
    }else{
        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.status, { backgroundColor }]}>
                    {messageContainer}
                </View>
            );
        }

        return (
            messageContainer
        )
    }
}

const statusHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(false) : getStatusBarHeight(true);


const styles = StyleSheet.create({
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    status: {
        zIndex: 1,
        height: statusHeight,
    },
    text: {
      color: 'white',  
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    }
})

export default StatusConnection