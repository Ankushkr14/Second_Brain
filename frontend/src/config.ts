// Backend URL configuration
export const BACKEND_URL = import.meta.env.PROD 
  ? "https://second-brain-lyart.vercel.app/"
  : "http://localhost:3000";