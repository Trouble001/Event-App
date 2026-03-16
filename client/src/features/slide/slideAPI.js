import axiosInstance from "../../services/axios";

export const fetchSlideGroupsAPI = () =>
  axiosInstance.get("/slide-groups/");

export const fetchSlidesByGroupAPI = (slug) =>
  axiosInstance.get(`/slides/?group=${slug}`);

export const createSlideGroupAPI = (data) =>
  axiosInstance.post("/slide-groups/", data);