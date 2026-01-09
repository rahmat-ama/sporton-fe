"use client";

import Image from "next/image";

const OrderConfirmed = () => {
  return (
    <div className="flex justify-center flex-col items-center bg-white w-160.25 p-16 mx-auto">
      <Image
        src={`/images/icon-order-confirmed.svg`}
        alt="order confirmed icon"
        width={117}
        height={117}
      />
      <h2 className="text-2xl font-semibold mb-2 mt-3">Order Confirmed!</h2>
      <p className="text-center mb-8">
        We have received your payment, and your order is currently processed by
        our staff, just wait until your favorite sportswear arrive in your home.
        We will contact you in Whatsapp for further shipping updates.
      </p>
    </div>
  );
};

export default OrderConfirmed;
