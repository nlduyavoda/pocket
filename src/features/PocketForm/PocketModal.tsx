import React, { ReactNode, useState } from "react";
import { Button, Modal } from "antd";
import "./PocketModal.css";

const PocketModal = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onSubmit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-screen">
      <Button className="border-spacing-1" onClick={showModal}>
        Add New
      </Button>
      <Modal
        classNames={{
          mask: "modalMask",
          body: "modalBody",
          footer: "modalFooter",
        }}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </div>
  );
};

export default PocketModal;
