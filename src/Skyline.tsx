import { useState, useCallback, useEffect } from "react"
import { Box } from "./Box"
import { Duration } from "./Duration"

type SkylineProps = {
  durations: Duration[]
  setDurations: (newDurations: Duration[]) => void
  stretchX: number
  stretchY: number
}

export function Skyline(props: SkylineProps) {
  const { durations, setDurations } = props

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      for (const d of durations) d.selected = false
      setDurations([...durations])
    }
  }, [durations])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => document.removeEventListener('keydown', escFunction, false)
  }, [durations])

  const compareDurations = (a: Duration, b: Duration) => {
    const lengthA = a.end - a.start 
    const lengthB = b.end - b.start
    return lengthB - lengthA
  }

  const addGrouping = (upbeatLength: number, groupSize: number) => {
    const newDurations = [...durations]
    for (let i=upbeatLength; i+groupSize<durations.length; i+=groupSize) {
      newDurations.push({
        start: durations[i].start,
        end: durations[i+groupSize-1].end,
        color: 'blue',
        selected: false
      })
    }
    setDurations(newDurations)
  }

  return (
    <>
      {durations?.sort(compareDurations).map((duration: Duration, index: number) => {
        return (
          <Box key={`box${index}`}
               duration={duration}
               stretchX={props.stretchX || 0}
               stretchY={props.stretchY || 0}
               onUpdateAppearance={(color: string, label: string) => {
                let newDurations = [...durations]
                newDurations[index].color = color 
                newDurations[index].label = label
                setDurations(newDurations)
               }}
               onSelect={() => {
                 for (const d of durations) d.selected = false
                 const newDurations = [...durations, {
                  start: duration.start,
                  end: duration.end,
                  color: 'gray',
                  selected: true
                 }]
                 setDurations(newDurations)
               }}
               onExpand={() => {
                 let newDurations = [...durations]
                 const selected = newDurations.find((d: Duration) => d.selected)
                 if (selected) {
                  selected.end = duration.end
                  setDurations(newDurations)
                 }
               }}
               onRemove={() => {
                 const newDurations = [...durations.filter((curr: Duration) => curr !== duration)]
                 setDurations(newDurations)
               }} />
        )
      })}
    </>
  )
}
  