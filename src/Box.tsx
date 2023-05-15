import { useContext, useState } from "react"
import { Duration } from "./Duration"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { HexColorPicker } from "react-colorful"
import ReactDOM from "react-dom";
import { SettingsContext } from "./SettingsContext";

type BoxProps = {
  duration: Duration
  stretchX: number
  stretchY: number
  onExpand: () => void
  onSelect: () => void
  onRemove: () => void
  onUpdateAppearance: (label: string, color?: string) => void
}

/**
 * Renders a single `Duration` object into the Skyline and 
 * provides a `Dialog` to modify its appearance.
 * 
 * @prop duration - the Duration object to be rendered
 * @prop stretchX - horizontal stretch
 * @prop stretchY - vertical stretch
 * @prop onExpand - function called when a box is clicked with the alt key pressed
 * @prop onSelect - function called when a box is clicked
 * @prop onRemove - function called when a box is clicked with alt and shift pressed
 * @prop onUpdateAppearance - function called once the appearance of a box was modified
 */
export function Box(props: BoxProps) {
  const { duration, stretchX, stretchY, onUpdateAppearance, onExpand, onSelect, onRemove } = props
  const { start, end, label, color, selected } = duration

  const { showLabels, useLines } = useContext(SettingsContext)

  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)

  const [currentColor, setCurrentColor] = useState(color)
  const [currentLabel, setCurrentLabel] = useState(label)

  let lowerY = 0
  let upperY = (end - start) * -stretchY

  const adjustToDegree = duration.degree !== undefined

  if (adjustToDegree) {
    const height = 0.2 * (end - start) * stretchY
    lowerY = duration.degree! * -stretchY - (height / 2)
    upperY = duration.degree! * -stretchY + (height / 2)
  }

  if (useLines && duration.degree) {
    return (
      <g>
        <line
          className='box'
          x1={start * stretchX}
          y1={duration.degree * -stretchY}
          x2={end * stretchX}
          y2={duration.degree * - stretchY}
          stroke={color || 'black'}
          strokeWidth={selected ? 9 : 7}
          onClick={(e) => {
            if (e.shiftKey && e.altKey) onRemove()
            else if (e.shiftKey) onExpand()
            else if (e.altKey) setShowEditDialog(true)
            else onSelect()
          }} />
        {showLabels && (
          <text
            className='boxLabel'
            alignmentBaseline='central'
            dominantBaseline='middle'
            textAnchor='middle'
            x={start * stretchX + 0.5 * (end - start) * stretchX}
            y={(adjustToDegree ? duration.degree! * -stretchY : upperY) + 10}
            fontFamily='serif'
            fontSize='10'>{label}</text>
        )}

        {ReactDOM.createPortal(
          <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
            <DialogTitle>Edit Box</DialogTitle>

            <DialogContent>
              <TextField
                label='Label'
                size='small'
                value={currentLabel}
                onChange={(e) => setCurrentLabel(e.target.value)}
                autoFocus
              />

              <HexColorPicker color={currentColor} onChange={setCurrentColor} />
            </DialogContent>

            <DialogActions>
              <Button onClick={() => {
                setShowEditDialog(false)
                onUpdateAppearance(currentLabel || '', currentColor)
              }}>Update</Button>
            </DialogActions>
          </Dialog>, document.querySelector('#root')!)}
      </g>
    )
  }

  return (
    <g>
      <polygon
        className='box'
        points={[[start * stretchX, lowerY].join(','), // start point
        [start * stretchX, upperY].join(','), // move up
        [end * stretchX, upperY].join(','), // move left
        [end * stretchX, lowerY].join(',')  // move down
        ].join(' ')}
        fill={color || 'white'}
        fillOpacity={0.6}
        stroke={'black'}
        strokeWidth={selected ? 2 : 1}
        onClick={(e) => {
          if (e.shiftKey && e.altKey) onRemove()
          else if (e.shiftKey) onExpand()
          else if (e.altKey) setShowEditDialog(true)
          else onSelect()
        }} />
      {showLabels && (
        <text
          className='boxLabel'
          alignmentBaseline='central'
          dominantBaseline='middle'
          textAnchor='middle'
          x={start * stretchX + 0.5 * (end - start) * stretchX}
          y={adjustToDegree ? duration.degree! * -stretchY : upperY}
          fontFamily='serif'
          fontSize='10'>{label}</text>
      )}

      {ReactDOM.createPortal(
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <DialogTitle>Edit Box</DialogTitle>

          <DialogContent>
            <TextField
              label='Label'
              size='small'
              value={currentLabel}
              onChange={(e) => setCurrentLabel(e.target.value)}
              autoFocus
            />

            <HexColorPicker color={currentColor} onChange={setCurrentColor} />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => {
              setShowEditDialog(false)
              onUpdateAppearance(currentLabel || '', currentColor)
            }}>Update</Button>
          </DialogActions>
        </Dialog>, document.querySelector('#root')!)}
    </g>
  )
}
