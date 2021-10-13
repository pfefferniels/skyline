import React from "react";

const Box = ({
  item,
  factorX,
  factorY,
  connectToLastItem,
  startNewItem,
  level
}) => {
  return (
    <rect
      x={item.position * factorX}
      y={0}
      width={item.duration * factorX}
      height={item.duration * factorY}
      style={{
        fill: item.selected ? `rgba(250, 0, 0, 0.3)` : `rgba(0,0,0, 0.3)`,
        strokeWidth: "1",
        stroke: "rgb(0,0,0)"
      }}
      onClick={(e) => {
        if (e.shiftKey) connectToLastItem(item);
        else startNewItem(item);
      }}
    />
  );
};

export default Box;
