import axiosInstance from "./axiosConfig";

// Get all users (engineers)
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get single user by ID
export const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Get user's projects
export const getUserProjects = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

// Search users
export const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get(`/users/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};