import React, { Children, ReactNode } from "react";
export const MetronicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between bg-[#edeef7] h-screen w-full p-10 flex-wrap">
      {Children.map(children, (child: any) => {
        return (
          <div className="bg-[#ffffff] inline-flex justify-between w-[100%] rounded-[20px] p-[20px] m-[10px]">
            {React.cloneElement(child)}
          </div>
        );
      })}
    </div>
  );
};
