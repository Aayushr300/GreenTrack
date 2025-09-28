// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Add token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle token expiration
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   login: (credentials) => api.post("/auth/login", credentials),
//   register: (userData) => api.post("/auth/register", userData),
//   getProfile: () => api.get("/auth/profile"),
// };

// export const carbonAPI = {
//   addEntry: (entryData) => api.post("/carbon", entryData),
//   getEntries: (params) => api.get("/carbon", { params }),
//   getStats: () => api.get("/carbon/stats"),
// };

// export const offsetAPI = {
//   createPayment: (data) => api.post("/offset/create-payment", data),
//   getHistory: () => api.get("/offset/history"),
// };

// export default api;

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
};

export const carbonAPI = {
  addEntry: (entryData) => api.post("/carbon", entryData),
  getEntries: (params) => api.get("/carbon", { params }),
  getEntry: (id) => api.get(`/carbon/${id}`),
  updateEntry: (id, entryData) => api.put(`/carbon/${id}`, entryData),
  deleteEntry: (id) => api.delete(`/carbon/${id}`),
  getStats: () => api.get("/carbon/stats"),
  getCategories: () => api.get("/carbon/categories"),
};

export const offsetAPI = {
  calculateCost: (carbonAmount) =>
    api.get("/offset/calculate-cost", {
      params: { carbonAmount },
    }),
  createPayment: (data) => api.post("/offset/create-payment", data),
  confirmPayment: (data) => api.post("/offset/confirm-payment", data),
  getHistory: () => api.get("/offset/history"),
};

export default api;
