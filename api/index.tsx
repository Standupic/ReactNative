import Axios, {AxiosRequestConfig} from 'axios';
import config from "../config";
import {getItem} from "../utils/localStorage"
import {Credentials} from "./types/common"
const qs = require('qs')

export interface HttpClient {
    post: typeof axios.post;
    get: typeof axios.get;
    patch: typeof axios.patch;
    delete: typeof axios.delete;
}

const axios = Axios.create({
    baseURL: config.host + config.prefix,
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets', allowDots: true });
    },
});

const isAuthRequest = (config: AxiosRequestConfig) => {
    return ['/authentication_token'].includes(config.url || '');
};

axios.interceptors.request.use(async (config) => {
       if(!isAuthRequest(config)){
           const token = await getItem<Credentials>('token')
           config.headers.Authorization = `Bearer ${token.token}`
       }
       return config
})

export default axios;