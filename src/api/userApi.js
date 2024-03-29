import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => {
    const url = "/users";
    return axiosClient.get(url);
  },
  login: (data) => {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = "/register";
    return axiosClient.post(url, data);
  },
};

export default userApi;
