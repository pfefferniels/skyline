import React, { useState } from "react";
import Box from "./Box";
import OrientationLine from "./OrientationLine";

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
    const newItem = { ...item, selected: true };

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

  const ceiledMaxDuration = Math.ceil(maxDuration / 10) * 10;
  const svgHeight = ceiledMaxDuration * factorY + 50;

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
          <Box
            key={`connectedItem${i}`}
            item={item}
            factorX={factorX}
            factorY={factorY}
            connectToLastItem={connectToLastItem}
            startNewItem={startNewItem}
            svgHeight={svgHeight}
          />
        ))}
      </g>

      {durationLevels &&
        durationLevels.reverse().map((durations, level) => (
          <g key={`durations${level}`} className={`level${level}`}>
            {durations.map((item, i) => (
              <Box
                key={`box${i}`}
                item={item}
                factorX={factorX}
                factorY={factorY}
                connectToLastItem={connectToLastItem}
                startNewItem={startNewItem}
                svgHeight={svgHeight}
              />
            ))}
          </g>
        ))}

      <OrientationLine
        ceiledMaxDuration={ceiledMaxDuration}
        y={ceiledMaxDuration * factorY}
        width={svgWidth}
      />
    </svg>
  );
};

export default Skyline;
