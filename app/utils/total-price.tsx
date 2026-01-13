import { CartItem } from "../hooks/use-cart-store";

const totalPriceCounter = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  return totalPrice;
};

export default totalPriceCounter;
