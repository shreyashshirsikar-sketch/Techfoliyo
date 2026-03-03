import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

// Add auth token to requests if it exists
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors globally
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // You can also trigger a custom event for components to handle
          window.dispatchEvent(new CustomEvent("unauthorized"));
          // Optionally redirect to login
          // window.location.href = '/login';
          break;
        case 403:
          console.error("Forbidden access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("API error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response from server. Check your network connection.");
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

// Helper function to handle requests with error logging
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    // Log the error with endpoint information
    console.error(
      `API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      }
    );
    throw error.response?.data || error;
  }
};

// ==================== PROJECT ENDPOINTS ====================

/**
 * Get all published projects
 * @param {Object} params - Query parameters (pagination, filters, etc.)
 * @returns {Promise<Array>} List of published projects
 */
export const getProjects = (params = {}) => 
  handleRequest(API.get("/projects", { params }));

/**
 * Get single project by ID
 * @param {string|number} id - Project ID
 * @returns {Promise<Object>} Project details
 */
export const getProject = (id) => handleRequest(API.get(`/projects/${id}`));

/**
 * Get projects by user ID
 * @param {string|number} userId - User ID
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} List of user's projects
 */
export const getUserProjects = (userId, params = {}) =>
  handleRequest(API.get(`/projects/user/${userId}`, { params }));

/**
 * Get projects by category
 * @param {string} category - Category name
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} List of projects in category
 */
export const getProjectsByCategory = (category, params = {}) =>
  handleRequest(API.get(`/projects/category/${category}`, { params }));

/**
 * Search projects by query
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters
 * @returns {Promise<Array>} List of matching projects
 */
export const searchProjects = (query, params = {}) =>
  handleRequest(API.get("/projects/search", { params: { q: query, ...params } }));

/**
 * Get trending projects
 * @param {number} limit - Number of projects to return (default: 10)
 * @returns {Promise<Array>} List of trending projects
 */
export const getTrendingProjects = (limit = 10) =>
  handleRequest(API.get("/projects/trending", { params: { limit } }));

/**
 * Get featured projects
 * @returns {Promise<Array>} List of featured projects
 */
export const getFeaturedProjects = () =>
  handleRequest(API.get("/projects/featured"));

// ==================== DRAFT AND CREATION ENDPOINTS ====================

/**
 * Create a draft project
 * @param {string} title - Project title
 * @returns {Promise<Object>} Created draft project
 */
export const createDraftProject = (title) =>
  handleRequest(API.post("/projects/draft", { title }));

/**
 * Save a section to a project
 * @param {string|number} projectId - Project ID
 * @param {string} type - Section type
 * @param {Object} content - Section content
 * @returns {Promise<Object>} Updated project
 */
export const saveSection = (projectId, type, content) =>
  handleRequest(API.post(`/projects/${projectId}/section`, { type, content }));

/**
 * Publish a project
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Published project
 */
export const publishProject = (projectId) =>
  handleRequest(API.patch(`/projects/${projectId}/publish`));

// ==================== CRUD OPERATIONS ====================

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} Created project
 */
export const createProject = (projectData) =>
  handleRequest(API.post("/projects", projectData));

/**
 * Update a project
 * @param {string|number} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} Updated project
 */
export const updateProject = (id, projectData) =>
  handleRequest(API.patch(`/projects/${id}`, projectData));

/**
 * Delete a project
 * @param {string|number} id - Project ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteProject = (id) =>
  handleRequest(API.delete(`/projects/${id}`));

// ==================== INTERACTION ENDPOINTS ====================

/**
 * Like/unlike a project (toggles like status)
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Updated like status
 */
export const toggleProjectLike = (projectId) =>
  handleRequest(API.post(`/projects/${projectId}/like`));

/**
 * Like a project
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Updated like status
 */
export const likeProject = (projectId) =>
  handleRequest(API.post(`/projects/${projectId}/like`));

/**
 * Unlike a project
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Updated like status
 */
export const unlikeProject = (projectId) =>
  handleRequest(API.delete(`/projects/${projectId}/like`));

/**
 * Bookmark/unbookmark a project
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Updated bookmark status
 */
export const toggleProjectBookmark = (projectId) =>
  handleRequest(API.post(`/projects/${projectId}/bookmark`));

/**
 * Check if user has liked a project
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Like status
 */
export const checkProjectLike = (projectId) =>
  handleRequest(API.get(`/projects/${projectId}/like/status`));

/**
 * Increment project views
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Updated view count
 */
export const incrementProjectViews = (projectId) =>
  handleRequest(API.post(`/projects/${projectId}/view`));

/**
 * Get project comments
 * @param {string|number} projectId - Project ID
 * @param {Object} params - Query parameters (pagination)
 * @returns {Promise<Array>} List of comments
 */
export const getProjectComments = (projectId, params = {}) =>
  handleRequest(API.get(`/projects/${projectId}/comments`, { params }));

/**
 * Add a comment to a project
 * @param {string|number} projectId - Project ID
 * @param {string} text - Comment text
 * @returns {Promise<Object>} Created comment
 */
export const addProjectComment = (projectId, text) =>
  handleRequest(API.post(`/projects/${projectId}/comments`, { text }));

/**
 * Delete a comment
 * @param {string|number} projectId - Project ID
 * @param {string|number} commentId - Comment ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteProjectComment = (projectId, commentId) =>
  handleRequest(API.delete(`/projects/${projectId}/comments/${commentId}`));

// ==================== ANALYTICS ENDPOINTS ====================

/**
 * Get project analytics
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} Project analytics data
 */
export const getProjectAnalytics = (projectId) =>
  handleRequest(API.get(`/projects/${projectId}/analytics`));

/**
 * Get user's project stats
 * @param {string|number} userId - User ID
 * @returns {Promise<Object>} User's project statistics
 */
export const getUserProjectStats = (userId) =>
  handleRequest(API.get(`/projects/user/${userId}/stats`));

// ==================== BATCH OPERATIONS ====================

/**
 * Get multiple projects by IDs
 * @param {Array<string|number>} ids - Array of project IDs
 * @returns {Promise<Array>} List of projects
 */
export const getProjectsByIds = (ids) =>
  handleRequest(API.post("/projects/batch", { ids }));

/**
 * Archive multiple projects
 * @param {Array<string|number>} ids - Array of project IDs to archive
 * @returns {Promise<Object>} Archival confirmation
 */
export const archiveProjects = (ids) =>
  handleRequest(API.post("/projects/archive", { ids }));

// Export API instance for custom requests if needed
export default API;