import { useState } from "react";
import Button from "../../../(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import Modal from "../ui/modal";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProductModal = ({ isOpen, onClose }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <div className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                name="productName"
                id="productName"
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
                  placeholder="e. g. 200000"
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="e. g. 100"
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category">Product Category</label>
              <select name="category" id="category" defaultValue={""}>
                <option value="" disabled>
                  Select Category
                </option>
                <option value="running">Running</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
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
            placeholder="Product details ....."
          ></textarea>
        </div>
        <Button className="ml-auto mt-2.5 rounded-lg">Create Product</Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
