import { PlusOutlined } from "@ant-design/icons";
import FormCreate from "@features/Metronic/FormCreate";
import { Button } from "antd";
import { useState } from "react";

export const Footer = ({
  selectedDate,
  updatePayment,
}: {
  selectedDate: string;
  updatePayment?: (newPayment: unknown)=> void
}) => {
  const [isCreate, setIsCreate] = useState<boolean>(false);

  return (
    <div>
      {isCreate ? (
        <FormCreate
          selectedDate={selectedDate}
          onClose={() => setIsCreate(false)}
          updatePayment={updatePayment}
        />
      ) : (
        <div className="flex w-full justify-between">
          <div>
            <Button icon={<PlusOutlined />} onClick={() => setIsCreate(true)}>
              Add payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
