import http from "./http";

export type CreateCarPayload = {
  brand: string;
  model: string;
  year: number;
  engineImage?: string;
  chassisImage?: string;
  description?: string;
  note?: string;
};

export const createCar = async (payload: CreateCarPayload) => {
  const { data } = await http.post("/cars", payload);
  return data;
};