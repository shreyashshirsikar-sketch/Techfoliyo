import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

// Add auth token to requests if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Project endpoints
export const getProjects = () => API.get("/projects");
export const getProject = (id) => API.get(`/projects/${id}`);
export const getUserProjects = (userId) => API.get(`/projects/user/${userId}`);

// Draft and creation endpoints
export const createDraftProject = (title) => API.post("/projects/draft", { title });
export const saveSection = (projectId, type, content) => 
  API.post(`/projects/${projectId}/section`, { type, content });
export const publishProject = (projectId) => 
  API.patch(`/projects/${projectId}/publish`);

// Optional: Additional helpful endpoints
export const updateProject = (id, projectData) => API.patch(`/projects/${id}`, projectData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const getProjectsByCategory = (category) => API.get(`/projects/category/${category}`);
export const searchProjects = (query) => API.get(`/projects/search?q=${query}`);