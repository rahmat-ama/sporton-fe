import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../../../(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import Modal from "../ui/modal";
import { Category, Product } from "../../../types";
import { getAllCategories } from "../../../services/category.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";
import {
  createProduct,
  updateProduct,
} from "../../../services/product.service";
import { getImageUrl } from "../../../lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
};

const ProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: "",
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.log(`Failed to fetch categories ${error}`);
      toastError(`Failed to fetch categories ${error}`);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("description", formData.description);
      data.append("category", formData.categoryId);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      // reset / kosongkan FormData dan data lainnya
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      onSuccess?.();
      onClose?.();

      toastSuccess(
        isEditMode
          ? "Product updated successfully"
          : "Product created successfully",
      );
    } catch (error) {
      console.log(
        isEditMode
          ? `Failed to update product ${error}`
          : `Failed to create product ${error}`,
      );
      toastError(
        isEditMode
          ? `Failed to update product ${error}`
          : `Failed to create product ${error}`,
      );
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category._id,
        stock: product.stock,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (isOpen) {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
    }
  }, [isOpen, product, isEditMode]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setImageFile(null);
        setImagePreview(null);
      }}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Product Image sping"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running Shoes"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price === 0 ? "" : formData.price}
                  onChange={handleChange}
                  placeholder="e. g. 200000"
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock === 0 ? "" : formData.stock}
                  onChange={handleChange}
                  placeholder="e. g. 100"
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="categoryId">Product Category</label>
              <select
                name="categoryId"
                id="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            className="resize-none bg-white!"
            name="description"
            id="description"
            rows={7}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product details ....."
          ></textarea>
        </div>
        <Button
          className="ml-auto mt-2.5 rounded-lg"
          onClick={handleSubmit}
          disabled={isSubmiting}
          type="submit"
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
