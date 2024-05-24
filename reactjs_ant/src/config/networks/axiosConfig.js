import axios from "axios";
import constKey from "config/const/constKey";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(constKey.accessKey);
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response?.data?.data ?? response?.data ?? response;
  },
  function (error) {
    return Promise.reject(error?.response?.data ?? error?.response);
  }
);

const getApi = (url, other) => axios.get(url, other);

const postApi = (url, data, other) => axios.post(url, data, other);

const patchApi = (url, data, other) => axios.patch(url, data, other);

const deleteApi = (url, other) => axios.delete(url, other);

export { getApi, postApi, patchApi, deleteApi };
