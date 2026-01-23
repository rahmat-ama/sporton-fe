"use client";

import { FiPlus } from "react-icons/fi";
import Button from "../../../(landing)/components/ui/button";
import { useEffect, useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankModal from "../../components/bank-info/bank-modal";
import { Bank } from "../../../types";
import { deleteBank, getAllBanks } from "../../../services/bank.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";
import DeleteModal from "../../components/ui/delete-modal";

const BankInfoManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const fetchBank = async () => {
    try {
      const data = await getAllBanks();
      setBanks(data);
    } catch (error) {
      toastError("Failed to fetch bank data" + error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
      await deleteBank(bankToDeleteId);
      toastSuccess("Bank deleted successfully");
      setBankToDeleteId(null);
      setIsDeleteModalOpen(false);
      fetchBank();
    } catch (error) {
      toastError(`Failed to delete bank info ${error}`);
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Information</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} /> Add Bank Account
        </Button>
      </div>
      <BankInfoList banks={banks} onEdit={handleEdit} onDelete={handleDelete} />
      <BankModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={fetchBank}
        bank={selectedBank}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BankInfoManagement;
