import http from "./http";

export type ReportDoc = {
  _id: string;
  title: string;
  description?: string;
  createdAt?: string;
  imageUrl?: string;
  videoUrl?: string;
  videoSize?: number;
  videoMime?: string;
};

export type ReportsQuery = {
  q?: string;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
};

export const createReport = async (payload: { title: string; description?: string }) => {
  const { data } = await http.post(`/reports`, payload);
  return data?.data as ReportDoc;
};

export const createReportMultipart = async (form: FormData) => {
  const { data } = await http.post(`/reports`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data as ReportDoc;
};

export const listReports = async (params: ReportsQuery): Promise<{ data: ReportDoc[]; meta?: any }> => {
  const { data } = await http.get(`/reports`, { params });
  return { data: data?.data || [], meta: data?.meta };
};

export const getReport = async (id: string) => {
  const { data } = await http.get(`/reports/${id}`);
  return data?.data as ReportDoc;
};

export const updateReport = async (id: string, payload: Partial<ReportDoc>) => {
  const { data } = await http.put(`/reports/${id}`, payload);
  return data?.data as ReportDoc;
};

export const updateReportMultipart = async (id: string, form: FormData) => {
  const { data } = await http.put(`/reports/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data as ReportDoc;
};

export const deleteReport = async (id: string) => {
  const { data } = await http.delete(`/reports/${id}`);
  return data;
};
