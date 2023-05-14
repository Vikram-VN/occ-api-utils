import axios from "axios";
import { noop } from "./index";

const httpCall = async (request) => {
    const { method = "get", url, data, showNotification = false, onSuccess = noop, onError = noop, headers = {} } = request;
    try {
        return axios.request({ url: "/ccadmin/v1/".concat(url), data, method, headers })
            .then(res => {
                showNotification && onSuccess(res);
                return res.data;

            });
    } catch (error) {
        showNotification && onError(error.response?.data || error.message);
        return error.response?.data || error.message;
    }
};

export default httpCall;

