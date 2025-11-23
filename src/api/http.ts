// http.ts
import axios from "axios";

// إنشاء instance للـ axios
const isProd = typeof window !== "undefined" && window.location.hostname !== "localhost";
const baseURL = isProd ? "http://localhost:9000" : "http://localhost:9000";
const http = axios.create({
  baseURL,
  withCredentials: true,            // مهم عشان session cookies
  headers: { "Content-Type": "application/json" },
});

// interceptor للـ request لإضافة Authorization لو موجود token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  }
  return config;
});

// interceptor للـ response للتعامل مع 401
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      typeof window !== "undefined" &&
      window.location?.pathname !== "/login"
    ) {
      window.location.href = "/login"; // إعادة التوجيه للصفحة Login
    }
    return Promise.reject(error);
  },
);

export default http;
