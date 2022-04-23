import { useState } from "react"
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

type BoxProps = {
  duration: Duration
  stretchX: number 
  stretchY: number
  onExpand: () => void
  onSelect: () => void
  onRemove: () => void
  onUpdateAppearance: (color: string, label: string) => void
}

export function Box(props: BoxProps) {
  const { duration, stretchX, stretchY, onUpdateAppearance, onExpand, onSelect, onRemove} = props
  const { start, end, label, color, selected } = duration
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)

  const [currentColor, setCurrentColor] = useState(color)
  const [currentLabel, setCurrentLabel] = useState(label)

  const upperY = (end-start)*-stretchY

  return (
    <g>
      <polygon className='box'
               points={`${start*stretchX},${0} ${start*stretchX},${upperY}
                      ${end*stretchX},${upperY} ${end*stretchX},${0}`}
               fill={color}
               fillOpacity={0.6}
               stroke={'black'}
               strokeWidth={selected ? 2 : 1}
               onClick={(e) => {
                 if (e.shiftKey && e.altKey) onRemove()
                 else if (e.shiftKey) onExpand()
                 else if (e.altKey) setShowEditDialog(true)
                 else onSelect()
               }} />
      <text className='boxLabel'
            x={start*stretchX}
            y={upperY}
            fontFamily='serif'
            fontSize='13'>{label}</text>

      {ReactDOM.createPortal(
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>Edit Box</DialogTitle>

        <DialogContent>
          <TextField
            label="Label"
            size="small"
            value={currentLabel}
            onChange={(e) => setCurrentLabel(e.target.value)}
            autoFocus
          />

          <HexColorPicker color={currentColor} onChange={setCurrentColor} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            setShowEditDialog(false)
            onUpdateAppearance(currentColor, currentLabel || '')
          }}>Update</Button>
        </DialogActions>
        </Dialog>, document.querySelector('#root')!)}
    </g>
  )
}
