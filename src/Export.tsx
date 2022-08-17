import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Duration } from "./Duration";

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

type ExportProps = {
    onClose: () => void,
    open: boolean,
    durations: Duration[],
    secondaryDurations: Duration[]
}

export function Export(props: ExportProps) {
    const { onClose, open, durations, secondaryDurations } = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Export Skyline</DialogTitle>
            <DialogActions>
            <Button
                    sx={{ m: 1 }}
                    variant='outlined'
                    onClick={() => {
                        const svgContainer = document.querySelector('#svgContainer')
                        if (!svgContainer) return
                        const svg = svgContainer.innerHTML || ''
                        const blob = new Blob([svg], { type: 'image/svg+xml' })
                        downloadBlob(blob, 'skyline.svg')
                        onClose()
                    }}>
                    as SVG
                </Button>

                <Button
                    sx={{ m: 1 }}
                    variant='outlined'
                    onClick={() => {
                        const json = JSON.stringify({
                            upper: durations,
                            lower: secondaryDurations
                        })
                        const blob = new Blob([json], { type: 'application/json' })
                        downloadBlob(blob, 'skyline.json')
                        onClose()
                    }}>
                    as JSON
                </Button>
            </DialogActions>
        </Dialog>
    )
}
