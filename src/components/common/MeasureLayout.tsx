import React, {ReactNode, useState} from 'react';
import {LayoutChangeEvent, Platform, StyleSheet, View} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface IMeasureLayout {
    children: (RN: ReactNode) => ReactNode
}

const MeasureLayout = (props: IMeasureLayout) => {
    const [layout, setLayout] = useState<React.ReactNode | null>(null)
    const handleLayout = (event: LayoutChangeEvent) => {
        const { nativeEvent: { layout } } = event;
        setLayout({
            ...layout,
            y: layout.y + (Platform.OS === 'android' ? getStatusBarHeight() : 0),
        })
    }
    
    if(!layout){
        return (
            <View onLayout={handleLayout} style={styles.container}/>
        );
    }
    return props.children ? props.children(layout) : null
}
                

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default MeasureLayout