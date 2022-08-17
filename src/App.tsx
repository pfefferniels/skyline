import React, { ChangeEvent, useRef, useState } from 'react';
import Butterfly from './Butterfly';
import './App.css';
import { Slider, Box, Button, Drawer, IconButton } from '@mui/material';
import { Duration } from './Duration';
import { Help } from './Help';
import { DataImport } from './DataImport';
import { HelpOutlined, UploadFileOutlined, SaveAsOutlined, TuneOutlined } from '@mui/icons-material';
import { Export } from './Export';

function App() {
  const [upperDurations, setUpperDurations] = useState<Duration[]>([])
  const [lowerDurations, setLowerDurations] = useState<Duration[]>([])
  const [importReady, setImportReady] = useState<boolean>(false)
  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [showToolbox, setShowToolbox] = useState<boolean>(false)
  const [showExport, setShowExport] = useState<boolean>(false)
  const [stretchX, setStretchX] = useState<number>(8)
  const [stretchY, setStretchY] = useState<number>(8)

  const audioInputFile = useRef(null)

  return (
    <div id="root">
      {importReady && (
        <>
          <div className='horizontalStretch'>
            <Slider
              aria-label="Horizontal Stretch"
              valueLabelDisplay="auto"
              defaultValue={8} step={2} min={1} max={50} marks
              onChange={(event: Event, value: number | number[]) => setStretchX(value as number)}
            />
          </div>

          <div className='verticalStretch'>
            <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              aria-label="Vertical Stretch"
              orientation="vertical"
              valueLabelDisplay="auto"
              defaultValue={8} step={2} min={1} max={80} marks
              onChange={(_: Event, value: number | number[]) => setStretchY(value as number)}
            />
          </div>
        </>
      )}

      <Drawer anchor='left' open={showToolbox} onClose={() => setShowToolbox(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <input type='file'
            id='audio-file'
            ref={audioInputFile}
            style={{ display: "none" }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target && event.target.files) {
                let file = event.target.files[0]
                var reader = new FileReader()
                reader.onload = (e: ProgressEvent<FileReader>) => {
                  if (e.target) {
                    console.log(e.target.result)
                  }
                }
                reader.readAsText(file)
              }
            }} />

          <Button
            disabled
            sx={{ m: 1 }}
            variant='outlined'
            onClick={() => {
              if (audioInputFile && audioInputFile.current) {
                (audioInputFile.current as HTMLElement).click()
              }
            }
            }>
            Load Audio
          </Button>
        </Box>
      </Drawer>

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
          aria-label="export"
          disabled={!importReady}
          onClick={() => setShowExport(true)}>
          <SaveAsOutlined />
        </IconButton>

        <IconButton
          aria-label="edit options"
          disabled={!importReady}
          onClick={() => setShowToolbox(true)}>
          <TuneOutlined />
        </IconButton>

        <IconButton
          aria-label="open help"
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
