import Image from "next/image";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import Button from "./button";
import priceFormatter from "@/app/utils/price-formatter";

export const cartList = [
  {
    name: "SportsOn Hyperfast Shoes",
    category: "Running",
    price: 280000,
    qty: 2,
    imgUrl: "product-3.png",
  },
  {
    name: "SportsOn Rockets Tennis",
    category: "Tennis",
    price: 650000,
    qty: 1,
    imgUrl: "product-2.png",
  },
  {
    name: "SportsOn Slowlivin",
    category: "Running",
    price: 150000,
    qty: 3,
    imgUrl: "product-1.png",
  },
  {
    name: "SportsOn HypserSoccer v2",
    category: "Football",
    price: 450000,
    qty: 2,
    imgUrl: "product-4.png",
  },
];

const CartPopup = () => {
  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90">
      <div className="p-5 border-b border-gray-200 text-center font-bold">
        Shopping Cart
      </div>
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
            size="small"
            variant="ghost"
            className="w-7 h-7 p-0! self-center ml-auto"
          >
            <FiTrash2 />
          </Button>
        </div>
      ))}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-bold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button variant="dark" size="small" className="w-full mt-4">
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;
