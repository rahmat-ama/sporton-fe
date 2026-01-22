import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "../../../utils/price-formatter";
import Button from "../../../(landing)/components/ui/button";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "../../../types";
import { useState } from "react";
import { getImageUrl } from "../../../lib/api";

type TTransactionModalProps = {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
};

const TransactionModal = ({
  transaction,
  isOpen,
  onClose,
  onStatusChange,
}: TTransactionModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return;

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    setIsUpdating(true);
    await onStatusChange(transaction._id, status);
    setIsUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLocaleLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "paid":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transaction">
      <div className="flex gap-6">
        <div className="min-w-60">
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          {transaction.paymentProof ? (
            <Image
              src={getImageUrl(transaction.paymentProof)}
              alt="payment proof"
              width={225}
              height={401}
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-sm">No Payment proof uploaded</p>
            </div>
          )}
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-3 font-medium text-sm mb-5">
            <div className="flex justify-between">
              <div className="opacity-50">Date</div>
              <div className="text-right">
                {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{transaction.customerName}</div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{transaction.customerContact}</div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Shipping Address</div>
              <div className="text-right w-1/2">
                {transaction.customerAddress}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Status</div>
              <div
                className={`text-right w-fit uppercase px-2 py-1 text-xs font-bold ${getStatusColor(transaction.status)}`}
              >
                {transaction.status}
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-2">Items Purchase</h4>

          <div className="space-y-3">
            {transaction.purchasedItems.map((item) => (
              <div
                className="border border-gray-200 rounded-lg p-2 flex gap-2 items-center"
                key={item.productId._id}
              >
                <div className="bg-gray-200 rounded aspect-square w-8 h-8 flex items-center justify-center">
                  <Image
                    src={
                      item.productId != null
                        ? getImageUrl(item.productId.imageUrl)
                        : null
                    }
                    alt={item.productId.name}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="font-medium text-sm">{item.productId.name}</div>
                <div className="font-medium ml-auto text-sm">
                  {item.qty} units
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-sm mt-6">
            <h4>Total</h4>
            <div className="text-primary">
              {priceFormatter(parseInt(transaction.totalPayment))}
            </div>
          </div>
          {transaction.status !== "pending" ? null : (
            <div className="flex justify-end gap-5 mt-12 font-medium">
              {isUpdating ? (
                <div className="text-center">Updating...</div>
              ) : (
                <>
                  <Button
                    className="text-primary! bg-primary/20! rounded-md!"
                    size="small"
                    onClick={() => handleStatusUpdate("rejected")}
                    disabled={isUpdating}
                  >
                    <FiX size={20} />
                    {isUpdating ? "Updating..." : "Reject"}
                  </Button>
                  <Button
                    className="text-white! bg-[#50C252]! rounded-md!"
                    size="small"
                    onClick={() => handleStatusUpdate("paid")}
                    disabled={isUpdating}
                  >
                    <FiCheck size={20} />
                    {isUpdating ? "Updating..." : "Approve"}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
