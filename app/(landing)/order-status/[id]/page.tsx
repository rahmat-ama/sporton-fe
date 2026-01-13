import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import { getTransactionById } from "@/app/services/transaction.service";
import { TPageProps } from "../../product/[id]/page";
import OrderRejected from "../../components/order-status/order-rejected";

const OrderStatus = async ({ params }: TPageProps) => {
  const { id } = await params;
  const transaction = await getTransactionById(id);

  const renderedElement = () => {
    switch (transaction.status) {
      case "pending":
        return <OrderSubmitted />;
      case "paid":
        return <OrderConfirmed />;
      case "rejected":
        return <OrderRejected />;
    }
  };

  return (
    <main className="bg-gray-100 pb-20">
      <div className="max-w-5xl mx-auto  py-10">
        <h1 className="text-5xl font-bold text-center mb-4">Order Status</h1>
      </div>
      {renderedElement()}
    </main>
  );
};

export default OrderStatus;
