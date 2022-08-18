import { Button, Box, Grid, Divider } from "@mui/material"
import { CSVImportButton } from "./CSVImportButton"
import { ChangeEvent, useRef } from "react"
import { Duration } from "./Duration"
import AddIcon from '@mui/icons-material/Add';

/**
 * converts data imported from the given CSV file into 
 * an array of `Duration` objects.
 * 
 * @param data CSV data as given by the papaparse library
 * @returns array of `Duration`
 */
const parseDurationsFromCSV = (data: any[]): Duration[] => {
    if (data.length === 0) {
        return []
    }

    let durations: Duration[] = []

    // interpret the imported data as a durations layer
    if (data[0].length === 4) {
        durations = data.map(row => ({
            start: +row[0],
            end: (+row[0]) + (+row[2]),
            label: row[3],
            degree: +row[1],
            color: 'white',
            selected: false
        }))
    }
    // interpret the imported data as a time instants layer
    else if (data[0].length === 2) {
        for (let i = 0; i < data.length - 1; i++) {
            durations.push({
                start: +data[i][0],
                end: +data[i + 1][0],
                /*label: data[i][1] */ // TODO make this optional
                color: 'gray',
                selected: false
            })
        }
    }

    return durations
}

type DataImportProps = {
    setDurations: (durations: Duration[]) => void
    setSecondaryDurations: (durations: Duration[]) => void
    setImportReady: (ready: boolean) => void
}

/**
 * A component which allows importing either CSV data or an 
 * existing JSON file. The resulting data will be passed to the 
 * `setDurations` and `setSecondaryDurations` props. Once the
 * import is completed, `setImportReady` will be called.
 * 
 * @prop setDurations - called once parsing is done
 * @prop setSecondaryDurations - called once parsing is done
 * @prop setImportReady - called once import is ready
 */
export function DataImport(props: DataImportProps) {
    const { setDurations, setSecondaryDurations, setImportReady } = props
    const jsonInputFile = useRef(null)

    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '90vh' }}
        >

            <Grid item xs={3}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            flexDirection: 'column',
                        }}>
                        <Box sx={{ textTransform: 'uppercase', m: 1 }}>
                            Import CSV from Sonic Visualiser
                        </Box>

                        <CSVImportButton
                            tooltip={'Given data will be rendered as the primary Skyline'}
                            label={'open CSV file'}
                            ready={(data) => setDurations([...parseDurationsFromCSV(data)])} />

                        <CSVImportButton
                            tooltip={`Add additional data (optional). Will be rendered
                                as a second Skyline mirrored around the x-axis`}
                            label={<AddIcon />}
                            ready={(data) => setSecondaryDurations(parseDurationsFromCSV(data))} />

                        <Button
                            variant='contained'
                            onClick={() => setImportReady(true)}>Render</Button>
                    </Box>

                    <Divider orientation='vertical' flexItem>or</Divider>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                        }}>

                        <Box sx={{ textTransform: 'uppercase', m: 1 }}>
                            Load existing JSON
                        </Box>

                        <input type='file'
                            id='file'
                            ref={jsonInputFile}
                            style={{ display: "none" }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                if (event.target && event.target.files) {
                                    let file = event.target.files[0]
                                    var reader = new FileReader()
                                    reader.onload = (e: ProgressEvent<FileReader>) => {
                                        if (e.target) {
                                            const importedButterfly = JSON.parse(e.target.result as string)
                                            setDurations(importedButterfly.upper)
                                            setSecondaryDurations(importedButterfly.lower)
                                            setImportReady(true)
                                        }
                                    }
                                    reader.readAsText(file)
                                }
                            }} />

                        <Button
                            variant='outlined'
                            onClick={() => {
                                if (jsonInputFile && jsonInputFile.current) {
                                    (jsonInputFile.current as HTMLElement).click()
                                }
                            }}>
                            Load JSON
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
