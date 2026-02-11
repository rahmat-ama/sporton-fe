"use client";

import { useEffect, useState } from "react";
import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { Transaction } from "../../../types";
import {
  getAllTransaction,
  updateTransaction,
} from "../../../services/transaction.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";

const ProdutManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransaction = async () => {
    try {
      const data = await getAllTransaction();
      setTransactions(data);
    } catch (error) {
      console.log(`Failed to fetch transactions ${error}`);
      toastError(`Failed to fetch transactions ${error}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected",
  ) => {
    try {
      await updateTransaction(id, { status });

      toastSuccess("Transaction status updated");

      await fetchTransaction();
    } catch (error) {
      console.log(`Failed to update transaction status ${error}`);
      toastError(`Failed to update transaction status ${error}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transactions</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable
        transactions={transactions}
        onViewDetails={handleViewDetails}
      />
      <TransactionModal
        transaction={selectedTransaction}
        onStatusChange={handleStatusChange}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProdutManagement;
