import axios from 'axios'
const api = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submitContact = async (formData) => {
  return api.post("/", formData)
};

// Backend Wake-up
export const wakeUpServer = () => {
  return api.get("/health");
};