import { fetchApi, getAuthHeaders } from "../lib/api";
import { Bank } from "../types";

export const getAllBanks = async (): Promise<Bank[]> => {
  const res = await fetchApi<Bank[]>("/banks");

  return res;
};

export const createBank = async (data: Partial<Bank>): Promise<Bank> => {
  return await fetchApi<Bank>("/banks", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateBank = async (
  id: string,
  data: Partial<Bank>,
): Promise<Bank> => {
  return await fetchApi<Bank>(`/banks/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteBank = async (id: string): Promise<void> => {
  return await fetchApi<void>(`/banks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
};
