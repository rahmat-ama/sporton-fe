"use client";

import { FiPlus } from "react-icons/fi";
import Button from "../../../(landing)/components/ui/button";
import { useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankModal from "../../components/bank-info/bank-modal";

const BankInfoManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    console.log("it's close");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Information</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsOpen(true)}>
          <FiPlus size={24} /> Add Bank Account
        </Button>
      </div>
      <BankInfoList />
      <BankModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BankInfoManagement;
