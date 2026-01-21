"use client";

import { FiPlus } from "react-icons/fi";
import Button from "../../../(landing)/components/ui/button";
import { useEffect, useState } from "react";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import { Category } from "../../../types";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/category.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";
import DeleteModal from "../../components/ui/delete-modal";

const CategoriesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toastError(`Failed to fetch categories ${error}`);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDeleteId) {
      try {
        await deleteCategory(categoryToDeleteId);
        fetchCategories();
        toastSuccess("Product deleted successfully");
        setIsDeleteModalOpen(false);
        setCategoryToDeleteId(null);
      } catch (error) {
        toastError(`Failed to delete product ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your products into categories</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} /> Add Category
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <CategoryModal
        category={selectedCategory}
        onSuccess={fetchCategories}
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

export default CategoriesManagement;
