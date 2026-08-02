import axios from 'axios'
const api = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// =============================
// Contact Form
export const submitContact = async (formData) => {
  return api.post("/", formData)
};

// =============================
// Backend Wake-up
export const wakeUpServer = () => {
  return api.get("/health");
};

// =============================
// Save User Location
export const saveLocation = async (locationData) => {
  return api.post("/location", locationData);
};