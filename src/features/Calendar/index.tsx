import { PlusOutlined } from "@ant-design/icons";
import Calendar from "@components/Calendar";
import FormCreate from "@features/Metronic/FormCreate";
import TableModal from "@features/PocketTable/TableModal";
import withPaymentMethods from "@hocs/withPaymentMethods";
import { formatDate } from "@utils/DateTime";
import { IWithPaymentMethodsProps, Payment } from "Types/IPayment";
import { Button, ModalProps } from "antd";
import { useEffect, useState } from "react";

export default withPaymentMethods(
  ({
    onDelete,
    onCreate,
    onSelect,
    calendarData,
    dataSourceFilterByDate,
  }: IWithPaymentMethodsProps & { dataSourceFilterByDate: any }) => {
    const { selectedDate, dataSource } = dataSourceFilterByDate;
    return (
      <div>
        <Calendar onSelect={onSelect} payments={calendarData} />
        {selectedDate && (
          <TableModal
            dataSource={dataSource}
            onClose={() => onSelect(null)}
            open={!!selectedDate}
            selectedDate={formatDate(selectedDate)}
            onDeletePayment={onDelete}
            modalProps={getModalProps({
              date: selectedDate,
              handleCreatePayment: onCreate,
            })}
          />
        )}
      </div>
    );
  }
);

const getModalProps = ({
  date,
  handleCreatePayment,
}: {
  date: string;
  handleCreatePayment: (newPayment: Payment) => void;
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
          const defaultFormValues = {
            key: "",
            value: "",
            eventId: "",
            categoryId: "",
            createAt: date,
          };
          return (
            <FormCreate
              onSubmit={handleCreatePayment}
              onClose={onClose}
              defaultValues={defaultFormValues}
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

