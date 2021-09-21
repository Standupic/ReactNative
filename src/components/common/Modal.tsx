import * as React from 'react';
import {Modal, Portal, Text, Button, Provider, useTheme, DefaultTheme} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {reset} from "../../../actions/auth";
import {StyleSheet, View} from "react-native";
import Logo from "../Logo";
import {useCallback} from "react";



interface IMyModal {
    isVisible: boolean,
    message: string | null
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    action?: () => { type: string; }
}


const MyModal = (props: IMyModal) => {
    const {isVisible, message, setVisible, action } = props
    const dispatch = useDispatch();
    const toClose = useCallback(() => {
        if(action){
            dispatch(action())
            setVisible(false)
        }
        setVisible(false)
    },[])
    return (
        <View style={styles.container}>
            <Provider>
                <Portal theme={{
                    colors:{ backdrop: "#a19d9d"}}}>
                    <Modal
                        visible={isVisible}
                        onDismiss={toClose}
                        contentContainerStyle={styles.content}>
                        <Text>{message}</Text>
                    </Modal>
                </Portal>
            </Provider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        textAlign: 'center',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 12,
    }
})

export default MyModal;