import priceFormatter from "../../../utils/price-formatter";
import { FiEye } from "react-icons/fi";

type TTransactionTableProps = {
  onViewDetails: () => void;
};
const TransactionTable = ({ onViewDetails }: TTransactionTableProps) => {
  const transactionData = [
    {
      date: "16 Jan 2026, 13.00",
      customer: "Ryan",
      contact: "0872654273432",
      total: 1872970,
      status: "pending",
    },
    {
      date: "15 Jan 2026, 11.00",
      customer: "Varras",
      contact: "0897365473234",
      total: 2372170,
      status: "paid",
    },
    {
      date: "14 Jan 2026, 16.00",
      customer: "Amin",
      contact: "0853724628742",
      total: 1342650,
      status: "rejected",
    },
    {
      date: "14 Jan 2026, 18.00",
      customer: "Gusbim",
      contact: "0827346736434",
      total: 1279610,
      status: "pending",
    },
  ];

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
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction, index) => (
            <tr
              key={index}
              className="borber-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">{transaction.date}</td>
              <td className="px-6 py-4 font-medium">{transaction.customer}</td>
              <td className="px-6 py-4 font-medium">{transaction.contact}</td>
              <td className="px-6 py-4 font-medium">
                {priceFormatter(transaction.total)}
              </td>
              <td className="px-6 py-4 font-semibold uppercase">
                <div
                  className={`rounded-full px-4 py-1 text-center border w-fit text-sm uppercase ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </div>
              </td>
              <td className="px-6 py-7.5 flex gap-3 items-center">
                <button
                  className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 w-fit py-1 px-2 rounded-md"
                  onClick={onViewDetails}
                >
                  <FiEye size={20} /> View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
