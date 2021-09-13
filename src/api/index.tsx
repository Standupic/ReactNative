import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import config from "../../config";

export interface ICrudHttp {
    [key: any]: <T=any, R=AxiosResponse<T>>;
    post: typeof axios.post;
    get: typeof axios.get;
    patch: typeof axios.patch;
    delete: typeof axios.delete;
}

const axios = Axios.create({
    baseURL: config.host + config.prefix,
   /* paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets', allowDots: true });
    },*/
});

export default axios;