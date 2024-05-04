import React, { Children, ReactElement, ReactNode } from "react";
import styled from "styled-components";

export const MetronicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MetronicWrapper>
      {Children.map(children, (child: ReactElement<any>) => {
        return <ChildrenStyle>{React.cloneElement(child)}</ChildrenStyle>;
      })}
    </MetronicWrapper>
  );
};

export const MetronicWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
  box-sizing: border-box;
  > li:first-child {
    flex-grow: 10;
  }
`;

export const ChildrenStyle = styled.li`
  background-color: #edeef7;
  border-radius: 20px;
  flex-grow: 1;
  padding: 20px;
  & div {
    object-fit: cover;
    vertical-align: bottom;
  }
`;
