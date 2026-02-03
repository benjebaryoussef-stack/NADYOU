import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Exercises
  getExercises: () => axios.get(`${API}/exercises`, { headers: getAuthHeader() }),
  getExercise: (id) => axios.get(`${API}/exercises/${id}`, { headers: getAuthHeader() }),
  
  // Workouts
  createWorkout: (data) => axios.post(`${API}/workouts`, data, { headers: getAuthHeader() }),
  getWorkouts: () => axios.get(`${API}/workouts`, { headers: getAuthHeader() }),
  getWorkoutStats: () => axios.get(`${API}/workouts/stats`, { headers: getAuthHeader() }),
  
  // Nutrition
  createNutrition: (data) => axios.post(`${API}/nutrition`, data, { headers: getAuthHeader() }),
  getNutrition: () => axios.get(`${API}/nutrition`, { headers: getAuthHeader() }),
  getNutritionStats: (days = 7) => axios.get(`${API}/nutrition/stats?days=${days}`, { headers: getAuthHeader() }),
  
  // Progress
  getProgressOverview: () => axios.get(`${API}/progress/overview`, { headers: getAuthHeader() }),
  
  // AI
  getAIRecommendation: (data) => axios.post(`${API}/ai/recommendations`, data, { headers: getAuthHeader() }),
  
  // Payments
  createCheckout: (data) => axios.post(`${API}/payments/checkout`, data, { headers: getAuthHeader() }),
  getCheckoutStatus: (sessionId) => axios.get(`${API}/payments/checkout/status/${sessionId}`, { headers: getAuthHeader() }),
  
  // Profile
  updateProfile: (data) => axios.put(`${API}/auth/profile`, data, { headers: getAuthHeader() }),
  
  // Password Reset
  requestPasswordReset: (data) => axios.post(`${API}/auth/forgot-password`, data),
  resetPassword: (data) => axios.post(`${API}/auth/reset-password`, data),
  
  // Mood Tracker
  createMoodEntry: (data) => axios.post(`${API}/mood`, data, { headers: getAuthHeader() }),
  getMoodHistory: () => axios.get(`${API}/mood`, { headers: getAuthHeader() }),
  getMoodInsights: () => axios.get(`${API}/mood/insights`, { headers: getAuthHeader() }),
  
  // Daily Recommendation
  getDailyRecommendation: () => axios.get(`${API}/daily-recommendation`, { headers: getAuthHeader() }),
};

export default api;