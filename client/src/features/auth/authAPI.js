import axiosInstance from "../../services/axios";

export const loginAPI = (data) =>
  axiosInstance.post("/auth/login/", data);

export const registerAPI = (data) =>
  axiosInstance.post("/auth/register/", data);

export const logoutAPI = () =>
  axiosInstance.post("/auth/logout/");

export const meAPI = () =>
  axiosInstance.get("/auth/me/");

export const editProfileAPI = (data) =>
  axiosInstance.patch("/auth/me/", data)

export const forgotPasswordAPI = (data) =>
  axiosInstance.post("/auth/forgot-password/", data);

export const resetPasswordAPI = (data) =>
  axiosInstance.post("/auth/reset-password/", data);