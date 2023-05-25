import axios from 'axios';
import { noop } from './index';
import { getInstanceId, getAccessToken, getAppKey } from '../store/selector';
import { store } from '../store'

const adminApi = async (request) => {
    const { method = 'get', url, data, showNotification = false, onSuccess = noop, onError = noop, headers = {} } = request;

    const instanceId = getInstanceId(store.getState());
    const accessToken = url.includes('login') ? getAppKey(store.getState()) : getAccessToken(store.getState());

    const customHeaders = { ...headers, 'X-InstanceId': instanceId, 'Authorization': `Bearer ${accessToken}` };

    const newHeaders = (instanceId && accessToken) ? customHeaders : headers;

    return axios.request({ url: '/ccadmin/v1/'.concat(url), data, method, headers: newHeaders })
        .then(res => {
            showNotification && onSuccess(res);
            return res.data;

        }).catch(error => {
            showNotification && onError(error.response?.data || error.message);
            return error.response?.data || error.message;
        });

};

export default adminApi;

export const agentApi = async (request) => {
    const { method = 'get', url, data, showNotification = false, onSuccess = noop, onError = noop, headers = {} } = request;

    const instanceId = getInstanceId(store.getState());
    const accessToken = url.includes('login') ? getAppKey(store.getState()) : getAccessToken(store.getState());

    const customHeaders = { ...headers, 'X-InstanceId': instanceId, 'Authorization': `Bearer ${accessToken}` };

    const newHeaders = (instanceId && accessToken) ? customHeaders : headers;

    return axios.request({ url: '/ccagent/v1/'.concat(url), data, method, headers: newHeaders })
        .then(res => {
            showNotification && onSuccess(res);
            return res.data;

        }).catch(error => {
            showNotification && onError(error.response?.data || error.message);
            return error.response?.data || error.message;
        });

};

export const adminApiCall = async (request) => {
    const { method = 'get', url, data, showNotification = false, onSuccess = noop, onError = noop, headers = {}, responseType = 'json' } = request;

    const instanceId = getInstanceId(store.getState());
    const accessToken = url.includes('login') ? getAppKey(store.getState()) : getAccessToken(store.getState());

    const customHeaders = { ...headers, 'X-InstanceId': instanceId, 'Authorization': `Bearer ${accessToken}` };

    const newHeaders = (instanceId && accessToken) ? customHeaders : headers;

    return axios.request({ url: url, data, method, headers: newHeaders, responseType })
        .then(res => {
            showNotification && onSuccess(res);
            return res;

        }).catch(error => {
            showNotification && onError(error.response?.data || error.message);
            return error;
        });

};


export const fileDownload = async (fileLink) => {
    const fileData = await adminApiCall({ url: 'file'.concat(fileLink) });
    const fileName = fileLink.split('/').pop();
    const contentType = fileData.headers['content-type'];
    const buffer = fileData.data.content;
    const bytes = new Uint8Array(buffer.data);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([bytes], { type: contentType }));
    link.download = fileName;
    link.click();
    link.remove();
};


export const adminFileDownload = async (fileLink) => {
    const modifiedLink = fileLink.split('admin.occa.ocs.oraclecloud.com')[1];
    const fileData = await adminApiCall({ url: modifiedLink });
    const fileName = fileLink.split('/').pop();
    const contentType = fileData.headers['content-type'];
    const buffer = fileData.data.content;
    const bytes = new Uint8Array(buffer.data);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([bytes], { type: contentType }));
    link.download = fileName;
    link.click();
    link.remove();
};