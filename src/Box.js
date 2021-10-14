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
  level
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [fill, setFill] = useState("rgba(0,0,0,0.3");
  const [label, setLabel] = useState("");

  return (
    <>
      <rect
        x={item.position * factorX}
        y={0}
        width={item.duration * factorX}
        height={item.duration * factorY}
        style={{
          fill,
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

      <text>{label}</text>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Box</DialogTitle>

        <DialogContent>
          <TextField label="Label" size="small" />
          <TextField label="Color" size="small" />
        </DialogContent>

        <DialogActions>
          <Button>Apply</Button>
          <Button>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Box;
