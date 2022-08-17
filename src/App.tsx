import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { HelpOutlined, UploadFileOutlined, SaveAsOutlined, TuneOutlined } from '@mui/icons-material';
import Butterfly from './Butterfly';
import { Help } from './Help';
import { Export } from './Export';
import { Settings } from './Settings';
import { ZoomControls } from './ZoomControls';
import { Duration } from './Duration';
import { DataImport } from './DataImport';
import './App.css';

function App() {
  const [upperDurations, setUpperDurations] = useState<Duration[]>([])
  const [lowerDurations, setLowerDurations] = useState<Duration[]>([])
  const [importReady, setImportReady] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [stretchX, setStretchX] = useState(8)
  const [stretchY, setStretchY] = useState(8)

  return (
    <div id="root">
      {importReady &&  <ZoomControls setStretchX={setStretchX} setStretchY={setStretchY} />}

      <Box
        sx={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content'
        }}>
        <IconButton
          aria-label="upload file"
          disabled={!importReady}
          onClick={() => {
            // start all over
            setUpperDurations([])
            setLowerDurations([])
            setImportReady(false)
          }}>
          <UploadFileOutlined />
        </IconButton>

        <IconButton
          aria-label='export'
          disabled={!importReady}
          onClick={() => setShowExport(true)}>
          <SaveAsOutlined />
        </IconButton>

        <IconButton
          aria-label='show settings'
          disabled={!importReady}
          onClick={() => setShowSettings(true)}>
          <TuneOutlined />
        </IconButton>

        <IconButton
          aria-label='open help'
          onClick={() => setShowHelp(true)}>
          <HelpOutlined />
        </IconButton>
      </Box>

      {importReady ?
        <Butterfly
          stretchX={stretchX}
          stretchY={stretchY}
          upperDurations={upperDurations} setUpperDurations={setUpperDurations}
          lowerDurations={lowerDurations} setLowerDurations={setLowerDurations} />
        :
        <DataImport
          setImportReady={setImportReady}
          setDurations={setUpperDurations}
          setSecondaryDurations={setLowerDurations} />
      }

      <Settings open={showSettings} onClose={() => setShowSettings(false)} />

      <Help open={showHelp} onClose={() => setShowHelp(false)} />

      <Export
        open={showExport}
        onClose={() => setShowExport(false)}
        durations={upperDurations}
        secondaryDurations={lowerDurations}/>

      <div className='copyright'>© Niels Pfeffer</div>
    </div>
  );
}

export default App;
