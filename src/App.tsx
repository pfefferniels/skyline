import React, { useState } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { HelpOutlined, UploadFileOutlined, SaveAsOutlined, TuneOutlined } from '@mui/icons-material';
import Butterfly from './Butterfly';
import { Help } from './Help';
import { Export } from './Export';
import { Settings } from './Settings';
import { ZoomControls } from './ZoomControls';
import { Duration, DurationCluster } from './Duration';
import { DataImport } from './DataImport';
import { Skyline } from './Skyline';
import './App.css';
import { SettingsContext } from './SettingsContext';
import { Cursor } from './Cursor';
import AudioPlayer from './AudioPlayer';

function App() {
  const [durations, setDurations] = useState<DurationCluster>()
  const [secondaryDurations, setSecondaryDurations] = useState<DurationCluster>()
  const [importReady, setImportReady] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [stretchX, setStretchX] = useState(8)
  const [stretchY, setStretchY] = useState(8)
  const [currentTime, setCurrentTime] = useState<number>()

  // settings
  const [useLines, setUseLines] = useState(false)
  const [showLabels, setShowLabels] = useState(false)
  const [horizontalTicks, setHorizontalTicks] = useState(5)

  return (
    <div id='root'>
      {importReady && <ZoomControls setStretchX={setStretchX} setStretchY={setStretchY} />}

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
            // start all over. 
            // TODO: Ideally, duration and secondaryDuration
            // are simpley reset and import ready is set to false. However
            // that won't trigger an update on the `Butterfly` component.
            window.location.reload()
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

        <Divider orientation='vertical' flexItem />

        <AudioPlayer onTimeUpdate={(time) => setCurrentTime(time)} />
      </Box>

      {importReady ?
        <SettingsContext.Provider value={{
          useLines,
          showLabels,
          horizontalTicks
        }}>
          <Butterfly>
            <Skyline
              durations={durations!}
              setDurations={setDurations}
              stretchX={stretchX}
              stretchY={stretchY} />

            {secondaryDurations && (
              <Skyline
                durations={secondaryDurations}
                setDurations={setSecondaryDurations}
                stretchX={stretchX}
                stretchY={-stretchY} />
            )}
            {currentTime &&
              <Cursor
                position={currentTime * stretchX}
                height={stretchY * 100} />
            }
          </Butterfly>
        </SettingsContext.Provider>
        :
        <DataImport
          setImportReady={setImportReady}
          setDurations={(durations: Duration[]) => setDurations(new DurationCluster(durations))}
          setSecondaryDurations={(durations: Duration[]) => setSecondaryDurations(new DurationCluster(durations))} />
      }

      <Settings
        useLines={useLines}
        setUseLines={setUseLines}

        showLabels={showLabels}
        setShowLabels={setShowLabels}

        horizontalTicks={horizontalTicks}
        setHorizontalTicks={setHorizontalTicks}

        open={showSettings}
        onClose={() => setShowSettings(false)} />

      <Help open={showHelp} onClose={() => setShowHelp(false)} />

      <Export
        open={showExport}
        onClose={() => setShowExport(false)}
        durations={durations?.durations || []}
        secondaryDurations={secondaryDurations?.durations || []} />

      <div className='copyright'>© Niels Pfeffer</div>
    </div>
  );
}

export default App;
