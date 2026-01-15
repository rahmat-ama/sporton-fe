import { FiPlus } from "react-icons/fi";
import Button from "../../../(landing)/components/ui/button";
import ProductTable from "../../components/products/product-table";

const ProdutManagement = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg">
          <FiPlus size={24} /> Add Product
        </Button>
      </div>
      <ProductTable />
    </div>
  );
};

export default ProdutManagement;
