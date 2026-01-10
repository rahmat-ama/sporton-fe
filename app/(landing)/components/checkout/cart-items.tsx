"use client";

import Image from "next/image";
import { cartList } from "../ui/cart-popup";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { useRouter } from "next/navigation";

const CartItems = () => {
  const router = useRouter();

  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CardWithHeader title="Cart Items">
      <div className="overflow-auto h-76">
        {cartList.map((item, index) => (
          <div
            className="border-b border-gray-200 p-4 flex gap-3"
            key={`${index}`}
          >
            <div className="bg-gray-100 aspect-square w-16 flex justify-center items-center">
              <Image
                src={`/images/products/${item.imgUrl}`}
                alt={`${item.name}`}
                width={63}
                height={63}
              />
            </div>
            <div className="self-center">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="flex gap-3 items-center">
                <div className="font-medium text-xs">{item.qty}x</div>
                <div className="text-primary">{priceFormatter(item.price)}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-7 h-7 p-0! self-center ml-auto"
            >
              <FiTrash2 />
            </Button>
          </div>
        ))}
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
          onClick={() => router.push("/payment")}
        >
          <FiCreditCard /> Proceed to Payment
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;
