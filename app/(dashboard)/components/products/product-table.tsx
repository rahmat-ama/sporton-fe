import Image from "next/image";
import priceFormatter from "../../../utils/price-formatter";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProductTable = () => {
  const productData = [
    {
      name: "Sporton Product 1",
      imageUrl: "/images/products/product-1.png",
      category: "Running",
      price: 289000,
      stock: 3,
    },
    {
      name: "Sporton Product 2",
      imageUrl: "/images/products/product-2.png",
      category: "Tennis",
      price: 189000,
      stock: 1,
    },
    {
      name: "Sporton Product 3",
      imageUrl: "/images/products/product-3.png",
      category: "Basketball",
      price: 239000,
      stock: 4,
    },
    {
      name: "Sporton Product 4",
      imageUrl: "/images/products/product-4.png",
      category: "Football",
      price: 329000,
      stock: 2,
    },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr
              key={index}
              className="borber-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={52}
                      height={52}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">
                  {product.category}
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                {priceFormatter(product.price)}
              </td>
              <td className="px-6 py-4 font-medium">{product.stock} units</td>
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

export default ProductTable;
