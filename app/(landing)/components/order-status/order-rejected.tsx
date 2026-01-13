"use client";

import { FiAlertCircle } from "react-icons/fi";

const OrderRejected = () => {
  return (
    <div className="flex justify-center flex-col items-center bg-white w-160.25 p-16 mx-auto">
      <div className="w-30 h-30 bg-primary-light rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-5">
        <FiAlertCircle size={84} />
      </div>
      <h2 className="text-2xl font-semibold mb-2 mt-3">Order Rejected !!</h2>
      <p className="text-center mb-8">
        We&apos;re sorry, your order is rejected because your payment proof is
        not valid.
      </p>
    </div>
  );
};

export default OrderRejected;
