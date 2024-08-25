import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';

const API_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    function (response) {
        //stop global loader
        return processRespnose(response);
    },
    function (error) {
        //stop global loader
        return (processError(error));
    }
)

///////////////////////////
// if success -> return {isSuccess:true, data:object}
// if fail -> return {isFailure: true, status:string ,msg: string , code:int}

const processRespnose = (response) => {
    console.log(response);
    if (response?.status === 200) {
        return {
            isSucess: true,
            data: response.data
        }
    }
    else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    console.log(`Error`);
    if (error.response) {
        // Server responded with a status other than 2xx
        console.log(`Error in response: `, error.response);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        // Request was made but no response received
        console.log(`Error in request: `, error.request);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        // Something else happened in setting up the request
        console.log(`Error in network: `, error.message);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
}

export { API };