import { Drawer } from "@mui/material";

type HelpProps = {
    open: boolean 
    onClose: () => void
}

export function Help(props: HelpProps) {
    const { open, onClose } = props
    return (
        <Drawer
            className="help"
            anchor="right"
            open={open}
            onClose={onClose}>
        <p>
          This tool takes time instants exported as a CSV file from Sonic
          Visualiser as input.
        </p>
        <p>
          In case you want to combine two or more boxes you can do so be clicking on the
          first box, then keeping the <kbd>shift</kbd> key down and clicking on one
          of the following boxes. A new box will appear that includes both.
        </p>
        <p>
          In order to delete wrongly combined boxes, hold <kbd>shift</kbd> and <kbd>alt</kbd> at 
          the same time and click on the box to be deleted.
        </p>
        <p>
          In order to change the visual appearence of a box, hold the <kbd>alt</kbd> key and 
          click on the box you want to edit. Here you can add a label text and change 
          the color and the transparency of a box.
        </p>
      </Drawer>
    )
}
