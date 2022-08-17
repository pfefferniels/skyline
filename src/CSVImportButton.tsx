import { Button, Tooltip, IconButton } from "@mui/material"
import { useCSVReader } from "react-papaparse"
import DeleteIcon from "@mui/icons-material/Delete"

type DataImportProps = {
  label: string
  ready: (data: any[]) => void
}

export function CSVImportButton(props: DataImportProps) {
  const { ready, label } = props 
  const { CSVReader } = useCSVReader()

  return (
    <CSVReader onUploadAccepted={(results: any) => {
        if (results.data) ready(results.data)
      }}>
      {({
        getRootProps,
        acceptedFile,
        getRemoveFileProps,
      }: any) => (
        <>
          <div className='import'>
            <div className='importLabel'>{label}</div>
            <Button size='small' variant='outlined' {...getRootProps()}>
              Open CSV File
            </Button>
            <div className='filename'>
              {acceptedFile && acceptedFile.name}
            </div>
            <Tooltip title="Delete">
                <IconButton {...getRemoveFileProps()}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
          </div>
        </>
      )}
    </CSVReader>
  )
}
  