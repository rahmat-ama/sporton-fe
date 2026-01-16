"use client";

import { FiPlus } from "react-icons/fi";
import Button from "../../../(landing)/components/ui/button";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { useState } from "react";

const ProdutManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    console.log("it's close");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsOpen(true)}>
          <FiPlus size={24} /> Add Product
        </Button>
      </div>
      <ProductTable />
      <ProductModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProdutManagement;
