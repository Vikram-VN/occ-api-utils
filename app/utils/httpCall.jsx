import axios from "axios";

const httpCall = async (url, data, headers, method) => {
    if (!method) method = "get"; if (!headers) headers = [];
    try {
        return await axios.request({ url: url, data: data, method: method, headers: headers })
            .then(res => {
                return res.data;
            });
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export default httpCall;