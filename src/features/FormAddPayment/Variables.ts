import { CSSProperties } from "react";

export const commonStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
};

export const drawerStyles: {
  header: CSSProperties;
  footer?: CSSProperties;
} = {
  header: {
    ...commonStyles,
  },
  footer: {
    ...commonStyles,
  },
};
