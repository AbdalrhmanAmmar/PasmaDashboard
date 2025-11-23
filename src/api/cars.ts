import http from "./http";

export type CarDoc = {
  _id: string;
  brand: string;
  model: string;
  year: number;
  description?: string;
  note?: string;
  engineImage?: string;
  chassisImage?: string;
};

export const listCars = async (): Promise<CarDoc[]> => {
  const { data } = await http.get("/cars");
  return data?.data || [];
};

export const getCar = async (id: string): Promise<CarDoc> => {
  const { data } = await http.get(`/cars/${id}`);
  return data?.data;
};

export const updateCar = async (id: string, payload: Partial<CarDoc>) => {
  const { data } = await http.put(`/cars/${id}`, payload);
  return data?.data;
};

export const deleteCar = async (id: string) => {
  const { data } = await http.delete(`/cars/${id}`);
  return data;
};

export const updateCarMultipart = async (id: string, form: FormData) => {
  const { data } = await http.put(`/cars/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data;
};

export const createCar = async (payload: Partial<CarDoc>) => {
  const { data } = await http.post(`/cars`, payload);
  return data?.data;
};