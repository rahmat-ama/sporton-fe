import CardWithHeader from "../ui/card-with-header";

const OrderInformation = () => {
  return (
    <CardWithHeader title="Order Information">
      <div className="p-5">
        <div className="mb-5 input-group">
          <label htmlFor="full_name">Full Name</label>
          <input type="text" id="full_name" placeholder="Type your full name" />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="wa_number">Whatsapp Number</label>
          <input type="text" id="wa_number" placeholder="+62xxxx" />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="shipping_address">Shipping Address</label>
          <textarea
            id="shipping_address"
            placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
            rows={7}
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
