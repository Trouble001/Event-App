import axiosInstance from "../../services/axios";

export const fetchUsersAPI = () =>
  axiosInstance.get("/auth/users/");