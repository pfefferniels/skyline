import { Drawer, Button } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent, useRef } from "react"

type SettingsProps = {
    open: boolean
    onClose: () => void
}

export function Settings(props: SettingsProps) {
    const { open, onClose } = props
    const audioInputFile = useRef(null)

    return (
        <Drawer anchor='left' open={open} onClose={onClose}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                }}
            >
                <input type='file'
                    id='audio-file'
                    ref={audioInputFile}
                    style={{ display: "none" }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target && event.target.files) {
                            let file = event.target.files[0]
                            var reader = new FileReader()
                            reader.onload = (e: ProgressEvent<FileReader>) => {
                                if (e.target) {
                                    console.log(e.target.result)
                                }
                            }
                            reader.readAsText(file)
                        }
                    }} />

                <Button
                    disabled
                    sx={{ m: 1 }}
                    variant='outlined'
                    onClick={() => {
                        if (audioInputFile && audioInputFile.current) {
                            (audioInputFile.current as HTMLElement).click()
                        }
                    }
                    }>
                    Load Audio
                </Button>
            </Box>
        </Drawer>

    )
}
