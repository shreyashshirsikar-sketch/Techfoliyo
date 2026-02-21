import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const getProjects = () => API.get("/projects");
export const getProject = (id) => API.get(`/projects/${id}`);
export const getUserProjects = (userId) => API.get(`/projects/user/${userId}`);
