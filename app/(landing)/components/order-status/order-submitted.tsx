"use client";

import Image from "next/image";
import Button from "../ui/button";
import { FiRefreshCw } from "react-icons/fi";

const OrderSubmitted = () => {
  const reloadOrderStatus = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center flex-col items-center bg-white w-160.25 p-16 mx-auto">
      <Image
        src={`/images/icon-order-submitted.svg`}
        alt="order submitted icon"
        width={117}
        height={117}
      />
      <h2 className="text-2xl font-semibold mb-2 mt-3">Order Submitted !!</h2>
      <p className="text-center mb-8">
        Your Order is recorded in our system, we are still confirming the
        payment status, please wait and your order status will be updated in
        less than 12 hours.
      </p>
      <Button variant="dark" className="w-full" onClick={reloadOrderStatus}>
        <FiRefreshCw /> Refresh Order Status
      </Button>
    </div>
  );
};

export default OrderSubmitted;
