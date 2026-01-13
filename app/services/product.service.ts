import { fetchApi } from "../lib/api";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetchApi<Product[]>("/products");

  return res;
};

export const getProductDetail = async (id: string): Promise<Product> => {
  const res = await fetchApi<Product>(`/products/${id}`);

  return res;
};
