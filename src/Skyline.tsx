import { useCallback, useEffect } from "react"
import { Box } from "./Box"
import { Duration, DurationCluster } from "./Duration"

type SkylineProps = {
  durations: DurationCluster
  setDurations: (newDurations: DurationCluster) => void
  stretchX: number
  stretchY: number
}

/**
 * This component sorts the `Duration` objects by their length,
 * renders them as `Box` components, provides functionalities
 * to combine durations and change their appearances.
 * 
 */
export function Skyline(props: SkylineProps) {
  const { durations, setDurations } = props

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      durations.unselectAll()
      setDurations(new DurationCluster(durations.durations))
    }
  }, [durations])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => document.removeEventListener('keydown', escFunction, false)
  }, [durations])

  return (
    <>
      {durations?.sort().map((duration: Duration, index: number) => {
        return (
          <Box key={`box${index}`}
               duration={duration}
               stretchX={props.stretchX || 0}
               stretchY={props.stretchY || 0}
               onUpdateAppearance={(color: string, label: string) => {
                let newDurations = [...durations.durations]
                newDurations[index].color = color 
                newDurations[index].label = label
                setDurations(new DurationCluster(newDurations))
               }}
               onSelect={() => {
                 durations.unselectAll()
                 const newDurations = [...durations.durations, {
                  start: duration.start,
                  end: duration.end,
                  color: 'gray',
                  selected: true
                 }]
                 setDurations(new DurationCluster(newDurations))
               }}
               onExpand={() => {
                 let newDurations = [...durations.durations]
                 const selected = newDurations.find((d: Duration) => d.selected)
                 if (selected) {
                  selected.end = duration.end
                  setDurations(new DurationCluster(newDurations))
                 }
               }}
               onRemove={() => {
                 durations.removeDuration(duration)
                 setDurations(new DurationCluster(durations.durations))
               }} />
        )
      })}
    </>
  )
}
