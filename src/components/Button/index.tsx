import { Button, ButtonProps } from "antd";

export const ButtonBase = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

export const btnSuccessStyles = {
  color: "#fff",
  backgroundColor: "#3699ff",
  borderColor: "#3699ff",
};

export const btnCancelStyles = {
  color: "#fff",
  backgroundColor: "#ff4d4f",
  borderColor: "#ff4d4f",
};

export const ButtonSuccess = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonBase {...props} style={btnSuccessStyles}>
      {children}
    </ButtonBase>
  );
};

export const ButtonCancel = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonBase {...props} style={btnCancelStyles}>
      {children}
    </ButtonBase>
  );
};
