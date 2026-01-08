import { FiCreditCard } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";

const paymentList = [
  {
    bank_name: "BCA",
    account_num: 121212232323,
    account_holder: "PT SportsOn Digital",
  },
  {
    bank_name: "Mandiri",
    account_num: 343434454545,
    account_holder: "PT SportsOn Digital",
  },
  {
    bank_name: "BRI",
    account_num: 565656676767,
    account_holder: "PT SportsOn Digital",
  },
];

const PaymentOptions = () => {
  return (
    <CardWithHeader title="Payment Options">
      {paymentList.map((payment, index) => (
        <div
          className="flex gap-5 p-6 border-b border-gray-200"
          key={`${index}`}
        >
          <div className="bg-blue-100 p-4 text-blue-500 h-fit self-center">
            <FiCreditCard size={24} />
          </div>
          <div className="self-center">
            <div className="font-bold">{payment.bank_name}</div>
            <div className="text-sm">{payment.account_num}</div>
            <div className="text-sm opacity-70">{payment.account_holder}</div>
          </div>
          <div className="bg-blue-50 ml-auto h-fit self-center py-1 px-2 text-gray-800 text-xs">
            Bank Transfer
          </div>
        </div>
      ))}
    </CardWithHeader>
  );
};

export default PaymentOptions;
