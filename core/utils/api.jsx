import axios from "axios";
import { noop } from "@/utils";
import { getInstanceId, getAccessToken, getAppKey } from "@/store/selector";
import { store } from "@/store";

const adminApi = async (request) => {
  const {
    method = "get",
    url,
    data,
    showNotification = false,
    onSuccess = noop,
    onError = noop,
    headers = {},
  } = request;

  const instanceId = getInstanceId(store.getState());
  const accessToken = getAccessToken(store.getState());

  const customHeaders = {
    ...headers,
    "X-InstanceId": instanceId,
    Authorization: `Bearer ${accessToken}`,
  };

  const newHeaders = instanceId && accessToken ? customHeaders : headers;

  return axios
    .request({
      url: "/ccadmin/v1/".concat(url),
      data,
      method,
      headers: newHeaders,
    })
    .then((res) => {
      showNotification && onSuccess(res);
      return res.data;
    })
    .catch((error) => {
      showNotification && onError(error.response?.data || error.message);
      return error.response?.data || error.message;
    });
};

export default adminApi;

export const adminXApi = async (request) => {
  const {
    method = "get",
    url,
    data,
    showNotification = false,
    onSuccess = noop,
    onError = noop,
    headers = {},
  } = request;

  const instanceId = getInstanceId(store.getState());
  const accessToken = getAccessToken(store.getState());

  const customHeaders = {
    ...headers,
    "X-InstanceId": instanceId,
    Authorization: `Bearer ${accessToken}`,
  };

  const newHeaders = instanceId && accessToken ? customHeaders : headers;

  return axios
    .request({
      url: "/ccadminx/custom/v1/".concat(url),
      data,
      method,
      headers: newHeaders,
    })
    .then((res) => {
      showNotification && onSuccess(res);
      return res.data;
    })
    .catch((error) => {
      showNotification && onError(error.response?.data || error.message);
      return error.response?.data || error.message;
    });
};

export const agentApi = async (request) => {
  const {
    method = "get",
    url,
    data,
    showNotification = false,
    onSuccess = noop,
    onError = noop,
    headers = {},
  } = request;

  const instanceId = getInstanceId(store.getState());
  const accessToken = getAccessToken(store.getState());

  const customHeaders = {
    ...headers,
    "X-InstanceId": instanceId,
    Authorization: `Bearer ${accessToken}`,
  };

  const newHeaders = instanceId && accessToken ? customHeaders : headers;

  return axios
    .request({
      url: "/ccagent/v1/".concat(url),
      data,
      method,
      headers: newHeaders,
    })
    .then((res) => {
      showNotification && onSuccess(res);
      return res.data;
    })
    .catch((error) => {
      showNotification && onError(error.response?.data || error.message);
      return error.response?.data || error.message;
    });
};

export const currentDate = (sp = "-") => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //As January is 0.
  let yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + sp + mm + sp + yyyy;
};

export const currentUTCDateTime = new Date().toISOString();

export const adminApiCall = async (request) => {
  const {
    method = "get",
    url,
    data,
    showNotification = false,
    onSuccess = noop,
    onError = noop,
    headers = {},
    responseType = "json",
  } = request;

  const instanceId = getInstanceId(store.getState());
  const accessToken = getAccessToken(store.getState());

  const customHeaders = {
    ...headers,
    "X-InstanceId": instanceId,
    Authorization: `Bearer ${accessToken}`,
  };

  const newHeaders = instanceId && accessToken ? customHeaders : headers;

  return axios
    .request({ url: url, data, method, headers: newHeaders, responseType })
    .then((res) => {
      showNotification && onSuccess(res);
      return res;
    })
    .catch((error) => {
      showNotification && onError(error.response?.data || error.message);
      return error;
    });
};
