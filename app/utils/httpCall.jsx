import axios from 'axios';
import { noop } from './index';
import { getInstanceId, getAccessToken } from '../store/selector';
import { store } from '../store'

const httpCall = async (request) => {
    const { method = 'get', url, data, showNotification = false, onSuccess = noop, onError = noop, headers = {} } = request;

    const instanceId = getInstanceId(store.getState());
    const accessToken = getAccessToken(store.getState());

    const customHeaders = { ...headers, 'apexit-instance-id': instanceId, 'apexit-access-token': accessToken };

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

export default httpCall;

