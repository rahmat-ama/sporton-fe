"use client";

import { FiPlus } from "react-icons/fi";
import Button from "../../../(landing)/components/ui/button";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { useEffect, useState } from "react";
import { Product } from "../../../types";
import {
  deleteProduct,
  getAllProducts,
} from "../../../services/product.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";
import DeleteModal from "../../components/ui/delete-modal";

const ProdutManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const fetchProduct = async () => {
    try {
      const data = await getAllProducts();

      if (data) {
        setProducts(data);
      }
    } catch (error) {
      toastError(`Failed to fetch products ${error}`);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDeleteId) {
      try {
        await deleteProduct(productToDeleteId);
        fetchProduct();
        toastSuccess("Product deleted successfully");
        setIsDeleteModalOpen(false);
        setProductToDeleteId(null);
      } catch (error) {
        toastError(`Failed to delete product ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} /> Add Product
        </Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        onSuccess={fetchProduct}
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProdutManagement;
