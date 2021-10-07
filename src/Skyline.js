import React, { useState } from "react";

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
      label: value.data[1],
      selected: false
    };

    return [...acc, duration];
  };
};

const Skyline = ({ data, levels, factorX, factorY }) => {
  const [connectedItems, setConnectedItems] = useState([]);

  const connectToLastItem = (item) => {
    let lastItem = connectedItems.at(-1);
    lastItem.duration += item.duration;
    lastItem.position = Math.min(lastItem.position, item.position);

    setConnectedItems((prev) => {
      return [...prev.slice(0, -1), lastItem];
    });
  };

  const startNewItem = (item) => {
    const newItem = {
      position: item.position,
      duration: item.duration,
      selected: true
    };

    const lastItem = connectedItems.at(-1);
    if (lastItem) {
      lastItem.selected = false;
      setConnectedItems((prev) => [...prev.slice(0, -1), lastItem, newItem]);
    } else {
      setConnectedItems((prev) => [...prev, newItem]);
    }
  };

  if (!data) {
    return null;
  }

  const durationLevels = levels
    .map((level) => data.reduce(diff(level), []))
    .reduce((acc, current) => [...acc, current], []);

  const maxDuration = Math.max(
    ...[
      ...data.reduce(diff(Math.max(...levels)), []).map((val) => val.duration),
      ...connectedItems.map((item) => item.duration)
    ]
  );

  const orientationLine = Math.ceil(maxDuration / 10) * 10;
  const svgHeight = orientationLine * factorY + 50;

  // take last time instant as a reference for the SVG width
  const svgWidth = data.at(-1).data[0] * factorX;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      style={{
        bottom: "1rem",
        position: "absolute",
        transform: "scale(1, -1)",
        transformOrigin: "center"
      }}
    >
      <g className={`connectedItems`}>
        {connectedItems.map((item, i) => (
          <rect
            key={`connectedItem${i}`}
            x={item.position * factorX}
            y={0}
            width={item.duration * factorX}
            height={item.duration * factorY}
            style={{
              fill: item.selected
                ? "rgba(150,0,0,0.2)"
                : "rgba(255,255,255,0.1)",
              strokeWidth: "1",
              stroke: "black"
            }}
            onClick={(e) => {
              if (e.shiftKey) connectToLastItem(item);
              else startNewItem(item);
            }}
          />
        ))}
      </g>

      {durationLevels &&
        durationLevels.reverse().map((durations, level) => (
          <g key={`durations${level}`} className={`level${level}`}>
            {durations.map((item, i) => (
              <rect
                key={`duration${i}`}
                x={item.position * factorX}
                y={0}
                width={item.duration * factorX}
                height={item.duration * factorY}
                style={{
                  fill: item.selected
                    ? `rgba(${level * 10}, 0, 0, 0.3)`
                    : `rgba(0,0,0, 0.3)`,
                  strokeWidth: "1",
                  stroke: "rgb(0,0,0)"
                }}
                onClick={(e) => {
                  if (e.shiftKey) connectToLastItem(item);
                  else startNewItem(item);
                }}
              />
            ))}
          </g>
        ))}

      <line
        className="orientationLine"
        x1={0.0}
        y1={orientationLine * factorY}
        x2={svgWidth}
        y2={orientationLine * factorY}
        stroke="black"
        strokeDasharray="4"
      />
      <text
        x={0.0}
        y={svgHeight - orientationLine * factorY - 10}
        style={{
          transform: "scale(1, -1)",
          transformOrigin: "center"
        }}
      >
        {orientationLine}s
      </text>
    </svg>
  );
};

export default Skyline;
