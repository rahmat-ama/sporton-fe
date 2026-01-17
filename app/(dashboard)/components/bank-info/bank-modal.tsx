import Button from "../../../(landing)/components/ui/button";
import Modal from "../ui/modal";

type TBankModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BankModal = ({ isOpen, onClose }: TBankModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Bank Account">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-8">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              name="bankName"
              id="bankName"
              placeholder="e. g. Mandiri, BCA, BRI"
              className="mt-1"
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
            />
          </div>
        </div>
        <Button className="ml-auto mt-4 rounded-lg" size="small">
          Create Bank Account
        </Button>
      </div>
    </Modal>
  );
};

export default BankModal;
