import axiosInstance from "../../services/axios";

export const fetchSlideGroupsAPI = () =>
  axiosInstance.get("/slide-groups/");

export const fetchSlidesByGroupAPI = ({ groupId, slug }) => {
  if (groupId) {
    return axiosInstance.get(`/slides/?group=${groupId}`);
  }

  if (slug) {
    return axiosInstance.get(`/slides/?slug=${slug}`);
  }

  throw new Error("Either groupId or slug is required");
};

export const createSlideGroupAPI = (data) =>
  axiosInstance.post("/slide-groups/", data);

export const updateSlideGroupAPI = (id, data) =>
  axiosInstance.put(`/slide-groups/${id}/`, data);

export const deleteSlideGroupAPI = (id) =>
  axiosInstance.delete(`/slide-groups/${id}/`);

export const createSlideAPI = (data) =>
  axiosInstance.post("/slides/", data);

export const updateSlideAPI = (id, data) =>
  axiosInstance.put(`/slides/${id}/`, data);

export const deleteSlideAPI = (id) =>
  axiosInstance.delete(`/slides/${id}/`);