import axiosInstance from "../../services/axios";

export const fetchUsersAPI = () =>
  axiosInstance.get("/auth/users/");

export const fetchUserAPI = (id) =>
  axiosInstance.get(`/auth/users/${id}/`);

export const updateUserAPI = (id, data) =>
  axiosInstance.patch(`/auth/users/${id}/`, data);

export const deleteUserAPI = (id) =>
  axiosInstance.delete(`/auth/users/${id}/`);