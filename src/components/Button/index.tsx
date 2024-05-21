import { Button, ButtonProps } from "antd";

export const ButtonBase = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

export const ButtonSuccess = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonBase
      {...props}
      style={{
        color: "#fff",
        backgroundColor: "#3699ff",
        borderColor: "#3699ff",
      }}
    >
      {children}
    </ButtonBase>
  );
};
