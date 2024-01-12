import React, { ReactNode, useState } from "react";
import { Button, Modal } from "antd";

const PocketModal = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="bg-blue border-spacing-1"
        type="primary"
        onClick={showModal}
      >
        Open Modal
      </Button>
      <Modal
        className="bg-purple w-screen"
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default PocketModal;
