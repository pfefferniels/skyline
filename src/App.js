import React, { useState } from "react";
import { CSVReader } from "react-papaparse";
import Skyline from "./Skyline";
import "./App.css";

const App = () => {
  const [csv, setCSV] = useState(null);
  const [levels, setLevels] = useState([]);
  const [factorX, setFactorX] = useState(1);
  const [factorY, setFactorY] = useState(5);
  const buttonRef = React.createRef();
  const levelsRef = React.createRef();

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnError = (err, file, inputElem, reason) => console.warn(err);

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
      const l = parseInt(level, 10);
      if (isNaN(l)) return 0;
      return l;
    });
    setLevels(newLevels);
  };

  return (
    <div>
      <div className="options">
        <CSVReader
          ref={buttonRef}
          onFileLoad={setCSV}
          onError={handleOnError}
          onRemoveFile={() => {
            setCSV([]);
          }}
        >
          {({ file }) => (
            <aside className="import">
              <button type="button" onClick={handleOpenDialog}>
                Browse file
              </button>
              <div className="filename">{file && file.name}</div>
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

        <br />

        <label htmlFor="factorX">Horizontal stretch</label>
        <input
          name="factorX"
          onChange={(e) => setFactorX(parseInt(e.target.value, 10))}
          type="number"
          value={factorX}
        />

        <br />

        <label htmlFor="factorY">Vertical stretch</label>
        <input
          name="factorY"
          onChange={(e) => setFactorY(parseInt(e.target.value, 10))}
          type="number"
          value={factorY}
        />
      </div>
      <div>
        <Skyline
          data={csv}
          levels={levels}
          factorX={factorX}
          factorY={factorY}
        />
      </div>
    </div>
  );
};

export default App;
