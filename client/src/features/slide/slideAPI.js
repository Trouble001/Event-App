import axiosInstance from "../../services/axios";

export const fetchSlideGroupsAPI = () =>
  axiosInstance.get("/slide-groups/");

export const fetchSlidesByGroupAPI = ({ groupId, slug }) => {
  if (groupId) {
    return axiosInstance.get(`/slides/?group=${groupId}`);
  }

  if (slug) {
    return axiosInstance.get(`/slides/?group=${slug}`);
  }

  throw new Error("Either groupId or slug is required");
};

export const createSlideGroupAPI = (data) =>
  axiosInstance.post("/slide-groups/", data);

export const createSlideAPI = (data) =>
  axiosInstance.post("/slides/", data);