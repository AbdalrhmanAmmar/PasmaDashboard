import http from "./http";

export const getCurrentUser = async () => {
  const { data } = await http.get("/auth/me", { withCredentials: true });
  return data;
};

export const logout = async () => {
  const { data } = await http.get("/auth/logout");
  return data;
};

export const googleAuthRedirect = async (queryString?: string) => {
  const path = `/auth/google/callback${queryString || ""}`;
  const { data } = await http.get(path);
  return data;
};

