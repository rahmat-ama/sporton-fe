import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../../../(landing)/components/ui/button";
import { Bank } from "../../../types";
import Modal from "../ui/modal";
import { createBank, updateBank } from "../../../services/bank.service";
import { toastError, toastSuccess } from "../../../utils/toast-notification";

type TBankModalProps = {
  bank: Bank | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const BankModal = ({ bank, isOpen, onClose, onSuccess }: TBankModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const isEditMode = !!bank;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateBank(bank._id, formData);
      } else {
        await createBank(formData);
      }

      setFormData({
        accountName: "",
        accountNumber: null,
        bankName: "",
      });

      onSuccess();
      onClose();

      toastSuccess(
        isEditMode
          ? "Bank info updated successfully"
          : "Bank info created successfully",
      );
    } catch (error) {
      console.log(
        isEditMode
          ? `Failed to update Bank info ${error}`
          : `Failed to create Bank info ${error}`,
      );
      toastError(
        isEditMode
          ? `Failed to update Bank info ${error}`
          : `Failed to create Bank info ${error}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
      });
    } else if (isOpen) {
      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
    }
  }, [bank, isOpen, isEditMode]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Update Bank Info" : "Add Bank Info"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-8">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              name="bankName"
              id="bankName"
              placeholder="e. g. Mandiri, BCA, BRI"
              className="mt-1"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              id="accountNumber"
              placeholder="682456254263234234"
              className="mt-1"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountName">Account Name / Holder</label>
            <input
              type="text"
              name="accountName"
              id="accountName"
              placeholder="Holder name as registered on the account"
              className="mt-1"
              value={formData.accountName}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          className="ml-auto mt-4 rounded-lg"
          size="small"
          onClick={handleSubmit}
          disabled={isSubmitting}
          type="submit"
        >
          {isEditMode ? "Update Bank Info" : "Create Bank Info"}
        </Button>
      </form>
    </Modal>
  );
};

export default BankModal;
