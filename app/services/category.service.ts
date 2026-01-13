import { fetchApi } from "../lib/api";
import { Category } from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetchApi<Category[]>("/categories");

  return res;
};
