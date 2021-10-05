import React, { useState } from "react";
import { CSVReader } from "react-papaparse";

const diff = (instantsToUnify) => {
  return (acc, value, index, array) => {
    const lastInstant = array[index - instantsToUnify];
    if ((index + instantsToUnify - 1) % instantsToUnify !== 0 || !lastInstant) {
      return acc;
    }

    const prevVal = parseFloat(lastInstant.data[0]);
    const currVal = parseFloat(value.data[0]);

    // this can happen when the first row in the CSV
    // data is used for labels.
    if (isNaN(prevVal) || isNaN(currVal)) return acc;

    const duration = {
      position: prevVal,
      duration: currVal - prevVal
    };

    console.log("index", index, "=", duration);

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

  const svgHeight = 550;

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
        durationLevels.map((durations, level) =>
          durations.map((item, i) => (
            <g>
              <rect
                x={item.position * 5}
                y={0}
                width={item.duration * 5}
                height={item.duration * 20}
                style={{
                  fill: `rgba(${level * 20}, ${level * 20}, ${
                    level * 20
                  }, 0.5)`,
                  strokeWidth: "1",
                  stroke: "rgb(0,0,0)"
                }}
              />
            </g>
          ))
        )}
    </svg>
  );
};

const App = () => {
  const [csv, setCSV] = useState(null);
  const [levels, setLevels] = useState([]);
  const buttonRef = React.createRef();
  const levelsRef = React.createRef();

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnError = (err, file, inputElem, reason) => console.log(err);
  const handleOnRemoveFile = (data) => console.log(data);

  const handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
      setCSV(null);
    }
  };

  const handleLevels = () => {
    if (!levelsRef.current) return;

    const value = levelsRef.current.value;
    const newLevels = value.split(",").map((level) => {
      return parseInt(level, 10);
    });
    setLevels(newLevels);
    console.log(newLevels);
  };

  return (
    <div>
      <CSVReader
        ref={buttonRef}
        onFileLoad={setCSV}
        onError={handleOnError}
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <button type="button" onClick={handleOpenDialog}>
              Browse file
            </button>
            <div>{file && file.name}</div>
            <button onClick={handleRemoveFile}>Remove</button>
          </aside>
        )}
      </CSVReader>

      <label htmlFor="levels">Levels (e.g. 1, 3, 6)</label>
      <input
        name="levels"
        onChange={handleLevels}
        type="text"
        ref={levelsRef}
      />

      <div>
        <Skyline data={csv} levels={levels} />
      </div>
    </div>
  );
};

export default App;
