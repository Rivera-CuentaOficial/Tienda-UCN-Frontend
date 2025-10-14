import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async config => {
  try {
    const res = await fetch("/api/auth/token", { credentials: "include" });
    const data = await res.json();

    if (data.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${data.accessToken}`;
    }
  } catch (err) {
    console.error("Error obteniendo token para interceptor:", err);
  }

  return config;
});
