import { Transaction } from "../../../types";
import priceFormatter from "../../../utils/price-formatter";
import { FiEye } from "react-icons/fi";

type TTransactionTableProps = {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction | null) => void;
};
const TransactionTable = ({
  transactions,
  onViewDetails,
}: TTransactionTableProps) => {
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
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              className="borber-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">
                {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-6 py-4 font-medium">
                {transaction.customerName}
              </td>
              <td className="px-6 py-4 font-medium">
                {transaction.customerContact}
              </td>
              <td className="px-6 py-4 font-medium">
                {priceFormatter(parseInt(transaction.totalPayment))}
              </td>
              <td className="px-6 py-4 font-semibold uppercase">
                <div
                  className={`rounded-full px-4 py-1 text-center border w-fit text-sm uppercase ${getStatusColor(
                    transaction.status,
                  )}`}
                >
                  {transaction.status}
                </div>
              </td>
              <td className="px-6 py-7.5 flex gap-3 items-center">
                <button
                  className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 w-fit py-1 px-2 rounded-md"
                  onClick={() => onViewDetails(transaction)}
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
