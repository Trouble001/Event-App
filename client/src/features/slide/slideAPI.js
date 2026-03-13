import axiosInstance from "../../services/axios";

export const fetchSlideGroupsAPI = () =>
  axiosInstance.get("/slide-groups/");

export const fetchSlidesAPI = (slug) =>
  axiosInstance.get(`/slides/?group=${slug}/`);