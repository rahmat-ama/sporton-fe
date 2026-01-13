"use client";

import React, { Dispatch, SetStateAction } from "react";
import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformation = {
  formData: CustomerInfo;
  setFormData: Dispatch<SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({ formData, setFormData }: TOrderInformation) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <CardWithHeader title="Order Information">
      <div className="p-5 h-105">
        <div className="mb-5 input-group">
          <label htmlFor="customerName">Full Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            placeholder="Type your full name"
            value={formData.customerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="customerContact">Whatsapp Number</label>
          <input
            type="text"
            id="customerContact"
            name="customerContact"
            placeholder="+62xxxx"
            value={(formData.customerContact as number) ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="customerAddress">Shipping Address</label>
          <textarea
            className="resize-none"
            id="customerAddress"
            name="customerAddress"
            placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
            rows={7}
            value={formData.customerAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
