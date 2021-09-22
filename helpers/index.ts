import {AUTH_ERROR} from "../api/types/user";

const errorText: Record<keyof typeof AUTH_ERROR, string> = {
    UNAUTHORIZED: `Неверный логин или пароль. Попробуйте ещё раз.`,
    UNKNOW: "Неизвестная ошибка обратитесь в службу подержки."
}

export const getErrorAuth = (status: number | undefined) => {
    if(status) {
        return status === 401 ? errorText["UNAUTHORIZED"] : errorText["UNKNOW"]
    }
    return errorText["UNKNOW"]
}