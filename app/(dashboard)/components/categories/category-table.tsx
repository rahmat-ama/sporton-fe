import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CategoryTable = () => {
  const categoryData = [
    {
      name: "Running",
      imageUrl: "/images/categories/category-running.png",
      description: "this is category running description",
    },
    {
      name: "Football",
      imageUrl: "/images/categories/category-football.png",
      description: "this is category football description",
    },
    {
      name: "Tennis",
      imageUrl: "/images/categories/category-tennis.png",
      description: "this is category tennis description",
    },
    {
      name: "Badminton",
      imageUrl: "/images/categories/category-badminton.png",
      description: "this is category badminton description",
    },
  ];
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
          {categoryData.map((category, index) => (
            <tr
              key={index}
              className="borber-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={category.imageUrl}
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
                <button>
                  <FiEdit2 size={20} />
                </button>
                <button>
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
