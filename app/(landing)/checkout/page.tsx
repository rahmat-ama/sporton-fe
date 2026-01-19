"use client";

import { useState } from "react";
import CartItems from "../components/checkout/cart-items";
import OrderInformation from "../components/checkout/order-information";
import { useRouter } from "next/navigation";
import { CustomerInfo, useCartStore } from "../../hooks/use-cart-store";
import { toastError } from "../../utils/toast-notification";

const Checkout = () => {
  const router = useRouter();
  const { setCustomerInfo } = useCartStore();

  const [formData, setFormData] = useState<CustomerInfo>({
    customerName: "",
    customerContact: null,
    customerAddress: "",
  });

  const handlePayment = () => {
    if (
      !formData.customerName ||
      !formData.customerContact ||
      !formData.customerAddress
    ) {
      toastError("Please fill all field needed!");
    } else {
      setCustomerInfo(formData);
      router.push("/payment");
    }
  };
  return (
    <main className="bg-gray-100 pb-20">
      <div className="max-w-5xl mx-auto  py-10">
        <h1 className="text-5xl font-bold text-center mb-10">Checkout Now</h1>
        <div className="grid grid-cols-2 gap-14">
          <OrderInformation formData={formData} setFormData={setFormData} />
          <CartItems handlePayment={handlePayment} />
        </div>
      </div>
    </main>
  );
};

export default Checkout;
