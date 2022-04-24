import React, { ChangeEvent, useRef, useState } from 'react';
import Butterfly from './Butterfly';
import './App.css';
import { Slider, Box, Button, Drawer, IconButton } from '@mui/material';
import { Duration } from './Duration';
import { DataImport } from './DataImport';
import { Help } from './Help';
import MenuIcon from '@mui/icons-material/Menu'

function downloadBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
}

function App() {
  const [upperDurations, setUpperDurations] = useState<Duration[]>([])
  const [lowerDurations, setLowerDurations] = useState<Duration[]>([])
  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [showToolbox, setShowToolbox] = useState<boolean>(false)
  const [stretchX, setStretchX] = useState<number>(8)
  const [stretchY, setStretchY] = useState<number>(8)

  const jsonInputFile = useRef(null)

  const parseDurationsFromCSV = (data: any[]) => {
    const durations: Duration[] = []
    for (let i=0; i<data.length-1; i++) {
      durations.push({
        start: +data[i][0],
        end: +data[i+1][0],
        /*label: data[i][1] */ // TODO make this optional
        color: 'gray', 
        selected: false
      })
    }
    return durations
  }

  return (
    <div id="root">
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
          onChange={(event: Event, value: number | number[]) => setStretchY(value as number)}
        />
      </div>

      <Drawer anchor='left' open={showToolbox} onClose={() => setShowToolbox(false)}>
        <Box>
          <Button onClick={() => setShowHelp(true)}>How to use?</Button>
          <DataImport label={'upper wing'} ready={(data) => setUpperDurations([...parseDurationsFromCSV(data)])} />
          <DataImport label={'lower wing'} ready={(data) => setLowerDurations(parseDurationsFromCSV(data))} />

          <Button onClick={() => {
            const svgContainer = document.querySelector('#svgContainer')
            if (!svgContainer) return
            const svg = svgContainer.innerHTML || ''
            const blob = new Blob([svg], { type: 'image/svg+xml' })
            downloadBlob(blob, 'skyline.svg')
          }} variant='outlined'>download SVG</Button>

          <br/>
          <Button onClick={() => {
            const json = JSON.stringify({
              upper: upperDurations,
              lower: lowerDurations
            })
            const blob = new Blob([json], { type: 'application/json' })
            downloadBlob(blob, 'skyline.json')
          }}>Save JSON</Button>

          <input type='file'
                 id='file'
                 ref={jsonInputFile}
                 style={{ display: "none" }}
                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
                   if (event.target && event.target.files) {
                    let file = event.target.files[0]
                    var reader = new FileReader()
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                      if (e.target) {
                        const importedButterfly = JSON.parse(e.target.result as string)
                        setUpperDurations(importedButterfly.upper)
                        setLowerDurations(importedButterfly.lower)
                      }
                    }
                    reader.readAsText(file)
                  }
                 }} />
          <Button onClick={() => {
              if (jsonInputFile && jsonInputFile.current) {
                (jsonInputFile.current as HTMLElement).click()
              }}}>Load JSON</Button>
        </Box>
      </Drawer>

      <Help open={showHelp} onClose={() => setShowHelp(false)} />

      <IconButton
        style={{position: 'absolute', top: '1rem', left: '1rem'}}
        color="inherit"
        aria-label="open drawer"
        onClick={() => setShowToolbox(true)}
        edge="start"
      >
        <MenuIcon />
      </IconButton>

      <div className='copyright'>© Niels Pfeffer</div>
    
      <Butterfly
        stretchX={stretchX}
        stretchY={stretchY}
        upperDurations={upperDurations} setUpperDurations={setUpperDurations}
        lowerDurations={lowerDurations} setLowerDurations={setLowerDurations} />
    </div>
  );
}

export default App;
