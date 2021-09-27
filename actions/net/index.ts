import {STATUS_CONNECT} from "../../constants";

export const is_connect = (status: boolean | null) => (
    {
        type: STATUS_CONNECT,
        payload: status
    }
)