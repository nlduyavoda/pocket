import { Button, Progress } from "antd";

export const Overview = (props: any) => {
  return <Content />;
};

const Content = () => {
  return (
    <div className="w-[300px] rounded-[20px] text-[#181c32]">
      <div className="flex justify-between">
        <p>title</p>
        <div>option</div>
      </div>
      <Progress type="circle" percent={75} />
      <div className="flex-wrap justify-center">
        <p>Notes: Current sprint requires</p>
        <p>
          Notes: Current sprint requires stakeholders to approve newly amended
          policies
        </p>
        <p>Notes</p>
      </div>
      <Button block>Primary Button</Button>
    </div>
  );
};
