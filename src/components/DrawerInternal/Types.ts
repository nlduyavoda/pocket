import { ReactNode } from "react";

export type DrawerType = {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children?: ReactNode;
};
