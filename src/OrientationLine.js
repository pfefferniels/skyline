import React from "react";

const OrientationLine = ({ ceiledMaxDuration, y, width }) => {
  return (
    <>
      <line
        className="orientationLine"
        x1={0.0}
        y1={y}
        x2={width}
        y2={y}
        stroke="black"
        strokeDasharray="4"
      />
      <text
        x={0.0}
        y={40}
        style={{
          transform: "scale(1, -1)",
          transformOrigin: "center"
        }}
      >
        {ceiledMaxDuration}s
      </text>
    </>
  );
};

export default OrientationLine;
