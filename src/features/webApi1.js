import axios from "axios";

export const client = (token = null) => {
  const defaultOptions = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return {
    get: (url, options = {}) =>
      axios.get(`${process.env.REACT_APP_BASE_URL}/${url}`, {
        ...defaultOptions,
        ...options,
      }),
    post: (url, data, options = {}) =>
      axios.post(`${process.env.REACT_APP_BASE_URL}/${url}`, data, {
        ...defaultOptions,
        ...options,
      }),
    put: (url, data, options = {}) =>
      axios.put(`${process.env.REACT_APP_BASE_URL}/${url}`, data, {
        ...defaultOptions,
        ...options,
      }),
    delete: (url, options = {}) =>
      axios.delete(`${process.env.REACT_APP_BASE_URL}/${url}`, {
        ...defaultOptions,
        ...options,
      }),
  };
};
