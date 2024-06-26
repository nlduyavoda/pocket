export const OverviewLayout = ({ children, ...props }) => {
  const renderControl = props.renderControl();
  const renderChildren = children();
  return (
    <div className="flex-wrap w-full overflow-auto">
      {renderControl}
      {renderChildren}
    </div>
  );
};

export const OverViewControl = ({ ...props }) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex-wrap">{props.renderLeftSide}</div>
      <div className="flex w-[200px] align-middle justify-between">
        {props.renderRightSide}
      </div>
    </div>
  );
};
