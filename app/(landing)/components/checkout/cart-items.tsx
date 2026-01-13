"use client";

import Image from "next/image";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { CartItem, useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import totalPriceCounter from "@/app/utils/total-price";
import { toastError } from "@/app/utils/toast-notification";

type TCartItemsProps = {
  handlePayment: () => void;
};

const CartItems = ({ handlePayment }: TCartItemsProps) => {
  const { items, removeItem } = useCartStore();

  const totalPrice = totalPriceCounter(items);

  const handleRemoveItem = (item: CartItem) => {
    removeItem(item._id);
    toastError("Item removed");
  };

  return (
    <CardWithHeader title="Cart Items">
      <div className="h-105 flex justify-between flex-col">
        <div className="overflow-auto">
          {items.length ? (
            items.map((item) => (
              <div
                className="border-b border-gray-200 p-4 flex gap-3"
                key={`${item._id}`}
              >
                <div className="bg-gray-100 aspect-square w-16 flex justify-center items-center">
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    alt={`${item.name}`}
                    width={63}
                    height={63}
                  />
                </div>
                <div className="self-center">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="flex gap-3 items-center">
                    <div className="font-medium text-xs">{item.qty}x</div>
                    <div className="text-primary">
                      {priceFormatter(item.price)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-7 h-7 p-0! self-center ml-auto"
                  onClick={() => handleRemoveItem(item)}
                >
                  <FiTrash2 />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-5 opacity-50">
              Your shopping cart is empty
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between font-bold">
            <div className="text-sm">Total</div>
            <div className="text-primary text-xs">
              {priceFormatter(totalPrice)}
            </div>
          </div>
          <Button
            variant="dark"
            className="w-full mt-4"
            onClick={handlePayment}
          >
            <FiCreditCard /> Proceed to Payment
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;
