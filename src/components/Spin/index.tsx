import React from "react";
import { Spin } from "antd";

const Loading: React.FC = (props) => <Spin {...props} />;

export const LoadingLarge: React.FC = (props) => {
  return <Spin size="large" {...props} />;
};
export default Loading;
