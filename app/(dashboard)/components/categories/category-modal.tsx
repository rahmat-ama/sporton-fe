import { useState } from "react";
import Button from "../../../(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import Modal from "../ui/modal";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CategoryModal = ({ isOpen, onClose }: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
      <div className="flex flex-col gap-6">
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
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
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
                placeholder="Category details ....."
              ></textarea>
            </div>
          </div>
        </div>
        <Button className="ml-auto mt-2.5 rounded-lg">Create Category</Button>
      </div>
    </Modal>
  );
};

export default CategoryModal;
