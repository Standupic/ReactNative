import * as React from 'react';
import {Modal, Portal, Text, Provider, Button} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {StyleSheet, View} from "react-native";
import {useCallback} from "react";


interface IMyModal {
    isVisible: boolean,
    message: string | null
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    action?: () => { type: string; }
}

const ModalError = (props: IMyModal) => {
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
                        <Text style={styles.message}>{message}</Text>
                        <Button style={styles.button} uppercase={false} onPress={toClose} color={'#1000ff'}>Ok</Button>
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
    button: {
        width: "100%",
        fontSize: 12,
        borderWidth: 1,
        borderTopColor: '#a19d9d',
    },
    message: {
        padding: 20,
        color: '#1000ff',
    },
    content: {
        backgroundColor: 'white',
        textAlign: 'center',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 12,
    }
})

export default ModalError;