import { FiCreditCard } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { getAllBanks } from "../../../services/bank.service";

const PaymentOptions = async () => {
  const banks = await getAllBanks();

  return (
    <CardWithHeader title="Payment Options">
      <div className="overflow-auto h-105">
        {banks.map((bank) => (
          <div
            className="flex gap-5 p-6 border-b border-gray-200"
            key={`${bank._id}`}
          >
            <div className="bg-blue-100 p-4 text-blue-500 h-fit self-center">
              <FiCreditCard size={24} />
            </div>
            <div className="self-center">
              <div className="font-bold">{bank.bankName}</div>
              <div className="text-sm">{bank.accountNumber}</div>
              <div className="text-sm opacity-70">{bank.accountName}</div>
            </div>
            <div className="bg-blue-50 ml-auto h-fit self-center py-1 px-2 text-gray-800 text-xs">
              Bank Transfer
            </div>
          </div>
        ))}
      </div>
    </CardWithHeader>
  );
};

export default PaymentOptions;
