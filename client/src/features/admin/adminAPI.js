import axiosInstance from "../../services/axios";

export const fetchUsersAPI = (page = 1, search = "") =>
  axiosInstance.get(`/auth/users/?page=${page}&search=${search}`);

export const fetchUserAPI = (id) =>
  axiosInstance.get(`/auth/users/${id}/`);

export const createUserAPI = (data) =>
  axiosInstance.post('/auth/users/', data);

export const updateUserAPI = (id, data) =>
  axiosInstance.patch(`/auth/users/${id}/`, data);

export const deleteUserAPI = (id) =>
  axiosInstance.delete(`/auth/users/${id}/`);
