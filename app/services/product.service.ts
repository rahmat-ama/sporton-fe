import { fetchApi, getAuthHeaders } from "../lib/api";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetchApi<Product[]>("/products");

  return res;
};

export const getProductDetail = async (id: string): Promise<Product> => {
  const res = await fetchApi<Product>(`/products/${id}`);

  return res;
};

export const createProduct = async (data: FormData): Promise<Product> => {
  return await fetchApi<Product>("/products", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
};

export const updateProduct = async (
  id: string,
  data: FormData,
): Promise<Product> => {
  return await fetchApi<Product>(`/products/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  return await fetchApi(`/products/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
};
