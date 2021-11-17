import React, { useState } from "react";
import {
  Drawer,
  Box,
  Button,
  Tooltip,
  IconButton,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CSVReader } from "react-papaparse";
import Skyline from "./Skyline";
import "./App.css";

const App = () => {
  const [csv, setCSV] = useState(null);
  const [upbeat, setUpbeat] = useState(0);
  const [levels, setLevels] = useState([]);
  const [factorX, setFactorX] = useState(1);
  const [factorY, setFactorY] = useState(5);
  const [showHelp, setShowHelp] = useState(false);
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
    if (!value) {
      console.log("no level specified");
      return;
    }

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
        <Box>
          <Button onClick={() => setShowHelp(true)}>How to use?</Button>
          <CSVReader
            ref={buttonRef}
            onFileLoad={setCSV}
            onError={handleOnError}
            onRemoveFile={() => {
              setCSV([]);
            }}
          >
            {({ file }) => (
              <div className="import">
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleOpenDialog}
                >
                  open CSV file
                </Button>
                {file && (
                  <>
                    <div className="filename">{file && file.name}</div>
                    <Tooltip title="Delete">
                      <IconButton onClick={handleRemoveFile}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </div>
            )}
          </CSVReader>

          <TextField
            size="small"
            label="Upbeat length"
            type="number"
            value={upbeat}
            onChange={(e) => setUpbeat(parseInt(e.target.value, 10))}
          />

          <TextField
            size="small"
            label="Levels"
            placeholder="e.g. 1, 3, 6"
            inputRef={levelsRef}
            onChange={handleLevels}
          />

          <TextField
            size="small"
            label="Horizontal stretch"
            placeholder="must be a number"
            type="number"
            value={factorX}
            onChange={(e) => setFactorX(parseInt(e.target.value, 10))}
          />

          <TextField
            size="small"
            label="Vertical stretch"
            placeholder="must be a number"
            value={factorY}
            type="number"
            onChange={(e) => setFactorY(parseInt(e.target.value, 10))}
          />
        </Box>
      </div>

      <Skyline data={csv} upbeat={upbeat} levels={levels} factorX={factorX} factorY={factorY} />

      <Drawer
        className="help"
        anchor="right"
        open={showHelp}
        onClose={() => setShowHelp(false)}
      >
        <p>
          This tool takes time instants exported as a CSV file from Sonic
          Visualiser as input.
        </p>
        <p>
          In the "levels" field you can specify, how the different metrical
          layers are combined. When putting "1", only the lowest metrical unit
          is displayed, meaning that every time instant is displayed as a box.
          When putting "3", every <i>third</i> instant is taken into account,
          meaning that the boxes combine three metrical units. When putting
          "1,3", both metrical layers are being displayed. You can specify an
          arbitrary amount of layers.
        </p>
        <p>
          Upbeat measures can be specified by defining the number of instants 
          that are part of an upbeat.
        </p>
        <p>
          In case you want to combine two boxes outside a regular scheme that
          applies for the whole piece, you can do so be clicking on the first
          first box, then keeping the <kbd>shift</kbd> key down and clicking on an adjecent
          box. A new box will appear that includes both.
        </p>
        <p>
          In order to delete wrongly combined boxes, hold <kbd>shift</kbd> and <kbd>alt</kbd> at 
          the same time and click on the box to be delted.
        </p>
        <p>
          In order to change the visual appearence of a box, hold the <kbd>alt</kbd> key and 
          click on the box you want to edit. Here you can add a label text and change 
          color and transparency of a box.
        </p>
        <h2>Example</h2>
        <p>...</p>
      </Drawer>

      <div className='copyright'>© Niels Pfeffer</div>
    </div>
  );
};

export default App;
