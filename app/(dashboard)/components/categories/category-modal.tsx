import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../../../(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import Modal from "../ui/modal";
import { Category } from "../../../types";
import { getImageUrl } from "../../../lib/api";
import {
  createCategory,
  updateCategory,
} from "../../../services/category.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";

type TCategoryModalProps = {
  category?: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type CategoryFormData = {
  name: string;
  description: string;
};

const CategoryModal = ({
  category,
  isOpen,
  onClose,
  onSuccess,
}: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!category;

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: category.name,
        description: category.description,
      });
      setImagePreview(
        category.imageUrl ? getImageUrl(category.imageUrl) : null,
      );
    } else if (isOpen) {
      setFormData({
        name: "",
        description: "",
      });
      setImagePreview(null);
    }
  }, [category, isOpen, isEditMode]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateCategory(category._id, data);
      } else {
        await createCategory(data);
      }

      setFormData({
        name: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      onSuccess?.();
      onClose();

      toastSuccess(
        isEditMode
          ? "Category updated successfully"
          : "Category created successfully",
      );
    } catch (error) {
      console.log(
        (isEditMode
          ? "Failed to update category"
          : "Failed to create category") + error,
      );
      toastError(
        (isEditMode
          ? "Failed to update category"
          : "Failed to create category") + error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setImageFile(null);
        setImagePreview(null);
      }}
      title={isEditMode ? "Edit Category" : "Add New Category"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Category Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <div className="flex flex-col justify-between gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running"
              />
            </div>
            <div className="input-group-admin flex flex-col justify-between">
              <label htmlFor="description">Description</label>
              <textarea
                className="resize-none bg-white!"
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Category details ....."
              ></textarea>
            </div>
          </div>
        </div>
        <Button
          className="ml-auto mt-2.5 rounded-lg"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isEditMode ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
