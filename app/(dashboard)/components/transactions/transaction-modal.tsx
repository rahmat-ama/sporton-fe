import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "../../../utils/price-formatter";
import Button from "../../../(landing)/components/ui/button";
import { FiCheck, FiX } from "react-icons/fi";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TransactionModal = ({ isOpen, onClose }: TTransactionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transaction">
      <div className="flex gap-6">
        <div>
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          <Image
            src={"/images/payment-proof-dummy.png"}
            alt="payment proof"
            width={225}
            height={401}
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-3 font-medium text-sm mb-5">
            <div className="flex justify-between">
              <div className="opacity-50">Date</div>
              <div className="text-right">16 Jan 2026, 13.00</div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Customer</div>
              <div className="text-right">Amin</div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Contact</div>
              <div className="text-right">0872654273432</div>
            </div>
            <div className="flex justify-between">
              <div className="opacity-50">Shipping Address</div>
              <div className="text-right w-1/2">
                Kebumen, Jawa Tengah, Indonesia, 53287
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-2">Items Purchase</h4>
          <div className="border border-gray-200 rounded-lg p-2 flex gap-2 items-center">
            <div className="bg-gray-200 rounded aspect-square w-8 h-8 flex items-center justify-center">
              <Image
                src={"/images/products/product-3.png"}
                alt="product image"
                width={30}
                height={30}
              />
            </div>
            <div className="font-medium text-sm">SportsOn Hyper Shoes</div>
            <div className="font-medium ml-auto text-sm">2 units</div>
          </div>
          <div className="flex justify-between font-semibold text-sm mt-6">
            <h4>Total</h4>
            <div className="text-primary">{priceFormatter(2519870)}</div>
          </div>
          <div className="flex justify-end gap-5 mt-12 font-medium">
            <Button
              className="text-primary! bg-primary/20! rounded-md!"
              size="small"
            >
              <FiX size={20} /> Reject
            </Button>
            <Button
              className="text-white! bg-[#50C252]! rounded-md!"
              size="small"
            >
              <FiCheck size={20} /> Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
