import React, {ReactNode, useEffect, useState} from "react";
import {LayoutRectangle, Keyboard, Platform, EmitterSubscription, KeyboardEvent} from "react-native";

const INITIAL_ANIMATION_DURATION = 250;

interface IKeyboardState {
    layout: LayoutRectangle
    children: (state: IInitialState & { containerHeight: number} ) => ReactNode
}
interface IInitialState {
    contentHeight: number,
    keyboardHeight: number,
    keyboardVisible: boolean,
    keyboardWillShow: boolean,
    keyboardWillHide: boolean,
    keyboardAnimationDuration: number,
}

const KeyboardState = (props: IKeyboardState) => {
    const { layout : { height }, layout, children } = props;
    const [state, setState] = useState<IInitialState>({
        contentHeight: height,
        keyboardHeight: 0,
        keyboardVisible: false,
        keyboardWillShow: false,
        keyboardWillHide: false,
        keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
    })
    const {
        contentHeight,
        keyboardWillHide,
        keyboardAnimationDuration,
        keyboardWillShow,
        keyboardVisible,
        keyboardHeight } = state
    const measure = (event: KeyboardEvent) => {
        const {
            endCoordinates: { height, screenY },
            duration,
        } = event
        
        setState(prevState => ({
            ...prevState,
            contentHeight: screenY - layout.y,
            keyboardHeight: height,
            keyboardAnimationDuration: duration || INITIAL_ANIMATION_DURATION
        }))
    }
    const HandleKeyboardWillShow = (event: KeyboardEvent ) => {
        setState(prevState => ({
            ...prevState,
            keyboardWillShow: true
        }))
        measure(event)
    }
    const HandleKeyboardWillHide = (event: KeyboardEvent) => {
        setState(prevState => ({
            ...prevState,
            keyboardWillHide: true
        }))
        measure(event)
    }
    const keyboardDidShow = (event: KeyboardEvent) => {
        setState(prevState => ({
            ...prevState,
            keyboardWillShow: false,
            keyboardVisible: true
        }))
        measure(event)
    }
    const keyboardDidHide = () => {
        setState(prevState => ({
            ...prevState,
            keyboardWillHide: false,
            keyboardVisible: false
        }))
    }
    useEffect(() => {
        const subscriptions: EmitterSubscription[] = []
        if (Platform.OS === 'ios') {
            subscriptions.push(
                Keyboard.addListener(
                    'keyboardWillShow',
                    HandleKeyboardWillShow,
                ),
                Keyboard.addListener(
                    'keyboardWillHide',
                    HandleKeyboardWillHide,
                ),
                Keyboard.addListener('keyboardDidShow', keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', keyboardDidHide)
            )
        } else {
            subscriptions.push(
                Keyboard.addListener('keyboardDidHide', keyboardDidHide),
                Keyboard.addListener('keyboardDidShow', keyboardDidShow)
            )
        }
        return () => {
            subscriptions.forEach(subscription => subscription.remove())
        }
    });
    return (
        children({
            containerHeight: layout.height,
            contentHeight,
            keyboardHeight,
            keyboardVisible, 
            keyboardWillShow, 
            keyboardWillHide, 
            keyboardAnimationDuration,
        })
    )
}

export default KeyboardState