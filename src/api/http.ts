// http.ts
import axios from "axios";

// إنشاء instance للـ axios
const http = axios.create({
  baseURL: "https://pasmaserver.onrender.com", // رابط الباكند لوكال
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
