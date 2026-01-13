import { fetchApi } from "../lib/api";
import { Bank } from "../types";

export const getAllBanks = async (): Promise<Bank[]> => {
  const res = await fetchApi<Bank[]>("/banks");

  return res;
};
