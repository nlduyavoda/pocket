import { Button } from "antd";
import { ReactNode } from "react";

export const FormFooter = ({
  onSubmit,
  onClose,
  children,
}: {
  onSubmit?: () => void;
  onClose?: () => void;
  children?: ReactNode;
}) => {
  return (
    <div className="w-full inline-flex flex-row justify-between">
      {children}
      <div className="inline-flex gap-x-5">
        {onClose && <Button onClick={onClose}>Cancel</Button>}
        {onSubmit && <Button onClick={onSubmit}>Submit</Button>}
      </div>
    </div>
  );
};
