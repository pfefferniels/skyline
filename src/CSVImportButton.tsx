import { Button, Tooltip, IconButton } from "@mui/material"
import { useCSVReader } from "react-papaparse"
import DeleteIcon from "@mui/icons-material/Delete"
import { ReactNode } from "react"

type DataImportProps = {
  label: string | ReactNode
  tooltip: string
  ready: (data: any[]) => void
}

/**
 * Imports CSV data using papaparse and passes the result
 * back to the `ready` callback.
 * 
 * @prop label - The of the button. Can be either a string or a MUI icon
 * @prop tooltip - A tooltip text which will be displayed when hovering on the button
 * @prop ready - A function which will be called with the parsed CSV
 */
export function CSVImportButton(props: DataImportProps) {
  const { ready, tooltip, label } = props
  const { CSVReader } = useCSVReader()

  return (
    <CSVReader onUploadAccepted={(results: any) => {
      if (results.data) ready(results.data)
    }}>
      {({
        getRootProps,
        acceptedFile,
        getRemoveFileProps,
      }: any) => {
        return (
          <>
            <div className='import'>
              {!acceptedFile ? (
                <Tooltip title={tooltip}>
                  {(typeof label === 'string') ? 
                    <Button variant='outlined' {...getRootProps()}>
                      {label}
                    </Button>
                    :
                    <IconButton {...getRootProps()}>
                      {label}
                    </IconButton>
                  }
                </Tooltip>)
                :
                <>
                  <span className='filename'>
                    {acceptedFile && acceptedFile.name}
                  </span>
                  <Tooltip title='Delete to select another file'>
                    <IconButton {...getRemoveFileProps()}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            </div>
          </>
        )
      }}
    </CSVReader>
  )
}
