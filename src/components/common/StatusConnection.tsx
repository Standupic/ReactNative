import React, {useEffect, useState} from 'react';
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {statusHeight, isIOS} from '../const';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const StatusConnection: React.FunctionComponent = (props) => {
    const isConnected = useSelector((state: RootState) => state.net.isConnected)
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
            <View style={styles.container}>
                {props.children}
            </View>
            )
    } else { 
        if (isIOS) {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
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