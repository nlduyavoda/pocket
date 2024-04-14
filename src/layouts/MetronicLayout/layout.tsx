import React, { Children, ReactNode } from "react";
export const MetronicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between bg-[#edeef7] h-full w-full p-10 gap-[30px] flex-wrap">
      {Children.map(children, (child: any) =>
        React.cloneElement(child, {
          style: {
            ...child.props.style,
            background: "#ffffff",
            display: "inline-flex",
            justify: "space-beetween",
            height: "300px",
            width: "calc(50% - 15px)",
            borderRadius: "20px",
          },
        })
      )}
    </div>
  );
};
