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
          This tool takes either time instants or durations exported as a CSV file from Sonic
          Visualiser as input. The layer type is be determined automatically from the given
          CSV file.
        </p>

        <p>
          It is possible to add an additional layer which will be displayed as a second Skyline
          mirrored on the x-axis ("Butterfly").
        </p>

        <p>
          The vertical and horizontal stretching can be modified using the sliders on the top 
          and on the left.
        </p>

        <p>
          The created Skyline can be downloaded using the export button on the top left.
          It is possible to download either an SVG file or to export the Skyline data as JSON.
          The latter might be useful in case you want to save a Skyline and continue
          editing it at a later point. 
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
