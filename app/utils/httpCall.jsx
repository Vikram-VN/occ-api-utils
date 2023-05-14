import axios from "axios";

const httpCall = async (request) => {
    try {
        const { method = "get", url, data, headers = {} } = request;
        return axios.request({ url: "/ccadmin/v1/".concat(url), data, method, headers })
            .then(res => {
                return res.data;
            });
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export default httpCall;

