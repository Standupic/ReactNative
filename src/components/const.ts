import {Platform} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";

export const isIOS = Platform.OS === 'ios'

export const statusHeight =
    isIOS ? getStatusBarHeight(false) : getStatusBarHeight(true);
