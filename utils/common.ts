import {RootState} from "../store";

export const getStringWithFilteredSpace = (str?: string) => {
    if (!str) {
        return '';
    }
    return str.trim().replace(/\s+/g, ' ');
};
