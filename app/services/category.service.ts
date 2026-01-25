import { fetchApi, getAuthHeaders } from "../lib/api";
import { Category } from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetchApi<Category[]>("/categories");

  return res;
};

export const createCategory = async (data: FormData): Promise<Category> => {
  return await fetchApi<Category>("/categories", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
};

export const updateCategory = async (
  id: string,
  data: FormData,
): Promise<Category> => {
  return await fetchApi<Category>(`/categories/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  return await fetchApi<void>(`/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
};
