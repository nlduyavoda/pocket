import { Modal, ModalProps } from "antd";
import { Control, FieldValues, useForm, UseFormProps } from "react-hook-form";

export type RequiredProps = {
  open: boolean;
  onSubmit?: (data: FieldValues) => void;
  onClose: () => void;
  control?: Control<FieldValues>;
  useFormOptionsProps?: UseFormProps;
  modalProps?: ModalProps;
};

export const withModal = <T extends RequiredProps>(
  Component: (props: T) => JSX.Element
) => {
  return (props: T) => {
    // const { handleSubmit, control } = useForm<FieldValues>(
    //   props.useFormOptionsProps
    // );
    return (
      <Modal
        open={props.open}
        // onOk={handleSubmit(
        //   (data: FieldValues) => props.onSubmit && props.onSubmit(data)
        // )}
        onCancel={() => props.onClose()}
        {...props.modalProps}
      >
        <Component {...props} />
      </Modal>
    );
  };
};
