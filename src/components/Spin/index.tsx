import React from "react";
import { Spin } from "antd";

const Loading: React.FC = (props) => <Spin {...props} />;

export const LoadingLarge: React.FC = (props) => {
  return (
    <Spin
      size="large"
      style={{
        margin: "50%",
        transform: "translate(-50%, -50%)",
      }}
      {...props}
    />
  );
};
export default Loading;
