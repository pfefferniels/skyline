import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

const Box = ({
  item,
  factorX,
  factorY,
  connectToLastItem,
  startNewItem,
  svgHeight
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [color, setColor] = useState("0,0,0,0.3");
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
          fill: `rgba(${color})`,
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
          />
          <TextField
            label="Color"
            size="small"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder={"Enter in the form 'r,g,b,a'"}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Box;
