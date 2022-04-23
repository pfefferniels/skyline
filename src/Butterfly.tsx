import React from "react"
import { Duration } from "./Duration"
import { Skyline } from "./Skyline"
import { VerticalRuler } from "./VerticalRuler"

type ButterflyProps = {
  stretchX: number
  stretchY: number
  upperDurations?: Duration[]
  lowerDurations?: Duration[]
  setUpperDurations?: (durations: Duration[]) => void
  setLowerDurations?: (durations: Duration[]) => void
}

export default function Butterfly(props: ButterflyProps) {
  const { stretchX, stretchY, upperDurations, setUpperDurations, lowerDurations, setLowerDurations } = props

  if (!upperDurations && !lowerDurations) {
    return (
      <p>at least one Skyline needs to be present</p>
    )
  }

  const upperEnd = (upperDurations && upperDurations.length) ? Math.max(...upperDurations.map(d => d.end)) : 0
  const lowerEnd = (lowerDurations && lowerDurations.length) ? Math.max(...lowerDurations.map(d => d.end)) : 0
  const upperVerticalMax = (upperDurations && upperDurations.length) ? Math.max(...upperDurations.map(d => d.end - d.start)) : 0
  const lowerVerticalMax = (lowerDurations && lowerDurations.length) ? Math.max(...lowerDurations.map(d => d.end - d.start)) : 0
  const upperHeight = stretchY * upperVerticalMax
  const lowerHeight = stretchY * lowerVerticalMax
  const width = stretchX * Math.max(upperEnd, lowerEnd)

  return (
    <div id="svgContainer">
      <svg className='butterfly'
           width={width + 10}
           height={upperHeight + lowerHeight + 10}
           viewBox={`0 ${-upperHeight-10} ${width} ${upperHeight + lowerHeight + 10}`}>
        {upperDurations && setUpperDurations && 
          <>
            <VerticalRuler x={30} height={-upperHeight} stretchY={stretchY} ticks={5} />
            <Skyline stretchX={stretchX}
                     stretchY={stretchY}
                     durations={upperDurations}
                     setDurations={setUpperDurations} />
          </>}

        {lowerDurations && setLowerDurations &&
          <>
            <VerticalRuler x={30} height={-upperHeight} stretchY={-stretchY} ticks={5} />
            <Skyline stretchX={stretchX}
                     stretchY={-stretchY}
                     durations={lowerDurations}
                     setDurations={setLowerDurations} />
          </>}
      </svg>
    </div>
  )
}
