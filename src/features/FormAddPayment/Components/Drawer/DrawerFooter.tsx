import { Button } from "antd";

export const FormFooter = ({
  onSubmit,
  onClose,
}: {
  onSubmit?: () => void;
  onClose?: () => void;
}) => {
  return (
    <div className="w-full inline-flex flex-row justify-between">
      <div className="inline-flex border-red-900 text-red">
        <div className="mr-10">Total: </div>
        <div>1202</div>
      </div>
      <div className="inline-flex gap-x-5">
        {onClose && <Button onClick={onClose}>Cancel</Button>}
        {onSubmit && <Button onClick={onSubmit}>Submit</Button>}
      </div>
    </div>
  );
};
