import { PlusOutlined } from "@ant-design/icons";
import Calendar from "@components/Calendar";
import FormCreate from "@features/Metronic/FormCreate";
import PaymentsSelected from "@features/PocketTable/PaymentsSelected";
import withPaymentMethods from "@hocs/withPaymentMethods";
import useDateMethods from "@hooks/useDateMethods";
import { formatDate } from "@utils/DateTime";
import { Payment } from "Types/IPayment";
import { Button, ModalProps } from "antd";
import { useEffect, useState } from "react";

export default withPaymentMethods(
  ({ onSetSelectedDate, originalData }: any) => {
    const {
      selectedDate,
      selectedDataSource,
      handleDelete,
      handleCreate,
      // handleUpdate,
      handleSelect,
    } = useDateMethods({ dataSource: originalData });

    return (
      <div>
        <Calendar onSelect={handleSelect} dataSource={originalData} />
        {selectedDate && (
          <PaymentsSelected
            dataSource={selectedDataSource}
            onClose={() => handleSelect(null)}
            open={!!selectedDate}
            selectedDate={formatDate(selectedDate)}
            onDelete={handleDelete}
            modalProps={getModalProps({
              date: selectedDate,
              handleCreatePayment: handleCreate,
              dataSource: originalData,
            })}
          />
        )}
      </div>
    );
  }
);

const defaultFormValues = {
  key: "",
  value: "",
  eventId: "",
  categoryId: "",
  createAt: "",
};

const getModalProps = ({
  date,
  handleCreatePayment,
  dataSource,
}: {
  date: string;
  handleCreatePayment: (newPayment: Payment) => void;
  dataSource: any;
}) => {
  return {
    width: 1000,
    okButtonProps: {
      type: "primary",
    },
    title: <h1>Current date: {date}</h1>,
    footer: (
      <Footer
        render={({ onClose }: { onClose: () => void }) => {
          return (
            <FormCreate
              onSubmit={handleCreatePayment}
              onClose={onClose}
              defaultValues={{
                ...defaultFormValues,
                createAt: date,
              }}
              dataSource={dataSource}
            />
          );
        }}
      />
    ),
  } as ModalProps;
};

const Footer = (props: any) => {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  useEffect(() => {
    const handleKeydown = (event: any) => {
      if (event.key === "Enter") {
        setIsCreate(true);
      }
    };
    const documentEvent = document.addEventListener("keydown", handleKeydown);
    return () => {
      return documentEvent;
    };
  }, []);
  return (
    <div>
      {isCreate ? (
        props.render({ onClose: () => setIsCreate(false) }) // Remove unnecessary arrow function syntax
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

