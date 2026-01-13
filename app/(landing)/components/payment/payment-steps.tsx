"use client";

import { FiCheckCircle } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { toastError, toastSuccess } from "@/app/utils/toast-notification";
import { ToastContainer } from "react-toastify";
import totalPriceCounter from "@/app/utils/total-price";
import { transactionCheckout } from "@/app/services/transaction.service";

const PaymentSteps = () => {
  const { push } = useRouter();
  const [file, setFile] = useState<File | null>();
  const { items, customerInfo, reset } = useCartStore();
  const totalPrice = totalPriceCounter(items);

  const handleConfirmPayment = async () => {
    if (!file) {
      toastError("Please upload your payment receipt!");
      return;
    }
    if (!customerInfo) {
      toastError("Customer information is missing, please return to checkout");
      push("/checkout");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("customerName", customerInfo.customerName);
      formData.append(
        "customerContact",
        customerInfo.customerContact!.toString()
      );
      formData.append("customerAddress", customerInfo.customerAddress);
      formData.append("image", file);
      formData.append(
        "purchasedItems",
        JSON.stringify(
          items.map((item) => ({ productId: item._id, qty: item.qty }))
        )
      );
      formData.append("totalPayment", totalPrice.toString());

      const res = await transactionCheckout(formData);

      toastSuccess("Transaction created succesfully");
      reset();
      push(`/order-status/${res._id}`);
    } catch (error) {
      toastError(`Something wrong when try to save customer info. ${error}`);
    }
  };

  return (
    <CardWithHeader title="Payment Steps">
      <ToastContainer />
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 text-justify mb-3">
          <li>
            Transfer the total amount of <b>{priceFormatter(totalPrice)}</b> to
            your preferred bank account listed under &apos;Payment Options&apos;
            (BCA, Mandiri, or BTPN).
          </li>
          <li>
            After completing the transfer, <b>keep the payment receipt</b> or a
            screenshot of the transfer confirmation. This will be needed for the
            next step.
          </li>
          <li>
            Upload the payment receipt/screenshot using the{" "}
            <b>&apos;Upload Receipt & Confirm&apos;</b> button below to validate
            your transaction.
          </li>
        </ol>
        <div className="mb-4">
          <FileUpload onFileSelect={setFile} />
        </div>
        <div className="border-t border-gray-200 p-2">
          <div className="flex justify-between font-semibold">
            <div className="text-sm">Total</div>
            <div className="text-primary text-xs">
              {priceFormatter(totalPrice)}
            </div>
          </div>
          <Button
            variant="dark"
            className="w-full mt-4"
            onClick={handleConfirmPayment}
          >
            <FiCheckCircle /> Upload Receipt & Confirm
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;
