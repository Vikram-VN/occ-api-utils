import axios from "axios";

const httpCall = async (method = "get", url, data, headers = {}) => {
    try {
        return axios.request({ url: '/ccadmin/v1'.concat(url), data: data, method: method, headers: headers })
            .then(res => {
                return res.data;
            });
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export default httpCall;