import { fetchApi } from "../lib/api";
import { Transaction } from "../types";

export const transactionCheckout = async (
  form: FormData
): Promise<Transaction> => {
  return await fetchApi<Transaction>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const res = await fetchApi<Transaction>(`/transactions/${id}`);
  return res;
};
