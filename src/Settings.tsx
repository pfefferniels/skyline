import { Drawer, Button, FormControl, FormControlLabel, Checkbox, TextField } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { ChangeEvent, useRef } from "react"

type SettingsProps = {
    open: boolean
    onClose: () => void

    useLines: boolean
    setUseLines: (useLines: boolean) => void

    showLabels: boolean
    setShowLabels: (showLabels: boolean) => void

    horizontalTicks: number
    setHorizontalTicks: (ticks: number) => void
}

export function Settings(props: SettingsProps) {
    const { open, onClose } = props

    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={onClose}>
            <Stack sx={{ margin: '0.5rem' }}>
                <FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(_, checked) => {
                                    props.setUseLines(checked)
                                }}
                                checked={props.useLines} />
                        }
                        label='Use horizontal lines instead of boxes' />
                </FormControl>

                <FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(_, checked) => {
                                    props.setShowLabels(checked)
                                }}
                                checked={props.showLabels} />
                        }
                        label='Embed Labels' />
                </FormControl>

                <TextField
                    variant='standard'
                    label='Display horizontal ticks every x seconds'
                    value={props.horizontalTicks}
                    onChange={e => {
                        props.setHorizontalTicks(+e.target.value)
                    }}
                    type='number' />
            </Stack>
        </Drawer>

    )
}
