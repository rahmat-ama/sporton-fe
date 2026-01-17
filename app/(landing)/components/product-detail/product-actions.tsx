"use client";

import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { Product } from "../../../types";
import { useCartStore } from "../../../hooks/use-cart-store";
import { toastError, toastSuccess } from "../../../utils/toast-notification";

type TProductActionsProps = {
  product: Product;
  stock: number;
};

const ProductActions = ({ product, stock }: TProductActionsProps) => {
  const { push } = useRouter();
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    try {
      addItem(product, qty);
      toastSuccess("Item added successfully");
    } catch (err) {
      toastError(`${err}`);
    }
  };

  const handleCheckout = () => {
    try {
      addItem(product, qty);
      toastSuccess("Item added successfully, redirecting to checkout page");
      setTimeout(() => {
        push("/checkout");
      }, 2000);
    } catch (err) {
      toastError(`${err}`);
    }
  };

  return (
    <div className="flex gap-5">
      <ToastContainer />
      <div className="border border-gray-500 inline-flex w-fit min-w-20.5">
        <div className="aspect-square text-xl font-medium border-r border-gray-500 flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col">
          <button
            className="border-b border-gray-500 cursor-pointer h-1/2 aspect-square flex justify-center items-center"
            onClick={() => setQty(qty < stock ? qty + 1 : qty)}
          >
            <FiChevronUp />
          </button>
          <button
            className="cursor-pointer h-1/2 aspect-square flex justify-center items-center"
            onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>
      <Button className="px-20 w-full" onClick={handleAddToCart}>
        <FiShoppingBag size={24} /> Add to Cart
      </Button>
      <Button variant="dark" className="px-20 w-full" onClick={handleCheckout}>
        Checkout Now <FiArrowRight size={24} />
      </Button>
    </div>
  );
};

export default ProductActions;
