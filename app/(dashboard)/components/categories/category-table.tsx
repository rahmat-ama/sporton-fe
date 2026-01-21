import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Category } from "../../../types";
import { getImageUrl } from "../../../lib/api";

type TCategoryTableProps = {
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
};
const CategoryTable = ({
  categories,
  onDelete,
  onEdit,
}: TCategoryTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Category Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category._id}
              className="borber-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={getImageUrl(category.imageUrl)}
                      alt={category.name}
                      width={52}
                      height={52}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{category.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="rounded-m px-2 py-1 w-fit">
                  {category.description}
                </div>
              </td>
              <td className="px-6 py-7.5 flex gap-3 text-gray-600 items-center">
                <button
                  onClick={() => onEdit?.(category)}
                  className="cursor-pointer"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => onDelete?.(category._id)}
                  className="cursor-pointer"
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
