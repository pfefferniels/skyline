import { Slider } from "@mui/material"

type ZoomControlsProps = {
    setStretchX: (stretchX: number) => void
    setStretchY: (stretchY: number) => void
}

export function ZoomControls(props: ZoomControlsProps) {
    const { setStretchX, setStretchY } = props 
    
    return (
        <>
          <div className='horizontalStretch'>
            <Slider
              aria-label="Horizontal Stretch"
              valueLabelDisplay="auto"
              defaultValue={8} step={0.5} min={0.5} max={50} marks
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
    )
}