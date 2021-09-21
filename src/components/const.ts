import {Platform, StatusBar} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import React from "react";

export const isIOS = Platform.OS === 'ios'

export const statusHeight =
    isIOS ? getStatusBarHeight(false) : getStatusBarHeight(true);
