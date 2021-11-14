import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { HexColorPicker } from "react-colorful";

const Box = ({
  item,
  factorX,
  factorY,
  connectToLastItem,
  startNewItem,
  svgHeight
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [color, setColor] = useState("#0000004d");
  const [label, setLabel] = useState("");

  const handleClose = () => setEditDialogOpen(false);

  return (
    <>
      <rect
        x={item.position * factorX}
        y={0}
        width={item.duration * factorX}
        height={item.duration * factorY}
        style={{
          fill: color,
          strokeWidth: item.selected ? "2" : "1",
          stroke: "black"
        }}
        onClick={(e) => {
          if (e.altKey) {
            setEditDialogOpen(true);
            return;
          }

          if (e.shiftKey) connectToLastItem(item);
          else startNewItem(item);
        }}
      />

      <text
        x={factorX * (item.duration / 2 + item.position)}
        y={svgHeight - item.duration * factorY - 5}
        textAnchor="middle"
        style={{
          transform: "scale(1, -1)",
          transformOrigin: "center"
        }}
      >
        {label}
      </text>

      <Dialog open={editDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Box</DialogTitle>

        <DialogContent>
          <TextField
            label="Label"
            size="small"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            autofocus
          />

          <HexColorPicker color={color} onChange={setColor} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Box;
