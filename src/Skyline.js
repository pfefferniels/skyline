import React from "react";

const factorX = 5,
  factorY = 20;

const diff = (instantsToUnify) => {
  return (acc, value, index, array) => {
    const nextInstant = array[index + instantsToUnify];
    if ((index + instantsToUnify - 1) % instantsToUnify !== 0 || !nextInstant) {
      return acc;
    }

    const currVal = parseFloat(value.data[0]);
    const nextVal = parseFloat(nextInstant.data[0]);

    if (isNaN(currVal)) return acc;

    const duration = {
      position: currVal,
      duration: nextVal - currVal,
      label: value.data[1]
    };

    return [...acc, duration];
  };
};

const Skyline = ({ data, levels }) => {
  if (!data) {
    return null;
  }

  const durationLevels = levels
    .map((level) => data.reduce(diff(level), []))
    .reduce((acc, current) => [...acc, current], []);

  const svgHeight =
    Math.max(
      ...data.reduce(diff(Math.max(...levels)), []).map((val) => val.duration)
    ) * factorY;

  return (
    <svg
      width="1000"
      height={svgHeight}
      style={{
        bottom: "1rem",
        position: "absolute",
        transform: "scale(1, -1)",
        transformOrigin: "center"
      }}
    >
      {durationLevels &&
        durationLevels.map((durations, level) => (
          <g className={`level${level}`}>
            {durations.map((item, i) => (
              <rect
                id={item.label}
                x={item.position * factorX}
                y={0}
                width={item.duration * factorX}
                height={item.duration * factorY}
                style={{
                  fill: `rgba(${level * 20}, ${level * 20}, ${
                    level * 20
                  }, 0.5)`,
                  strokeWidth: "1",
                  stroke: "rgb(0,0,0)"
                }}
              />
            ))}
          </g>
        ))}
    </svg>
  );
};

export default Skyline;
