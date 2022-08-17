import React from "react"
import { Duration } from "./Duration"
import { HorizontalRuler } from "./HorizontalRuler"
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

/**
 * Renders the upper and the lower durations as `Skyline`s 
 * in a single SVG element.
 */
export default function Butterfly(props: ButterflyProps) {
  const { stretchX, stretchY, upperDurations, setUpperDurations, lowerDurations, setLowerDurations } = props

  const hasUpperDurations = upperDurations && upperDurations.length
  const hasLowerDurations = lowerDurations && lowerDurations.length

  if (!hasUpperDurations && !hasLowerDurations) {
    return (
      <p>at least one Skyline needs to be present</p>
    )
  }

  const upperStart = hasUpperDurations ? Math.min(...upperDurations.map(d => d.start)) : 0
  const lowerStart = hasLowerDurations ? Math.min(...lowerDurations.map(d => d.start)) : 0
  const upperEnd = hasUpperDurations ? Math.max(...upperDurations.map(d => d.end)) : 0
  const lowerEnd = hasLowerDurations ? Math.max(...lowerDurations.map(d => d.end)) : 0
  const upperVerticalMax = hasUpperDurations ? Math.max(...upperDurations.map(d => d.end - d.start)) : 0
  const lowerVerticalMax = hasLowerDurations ? Math.max(...lowerDurations.map(d => d.end - d.start)) : 0
  const upperHeight = stretchY * upperVerticalMax
  const lowerHeight = stretchY * lowerVerticalMax

  const start = hasLowerDurations ? Math.min(upperStart, lowerStart) : upperStart
  const end = Math.max(upperEnd, lowerEnd)
  const startX = stretchX * start
  const endX = stretchX * end
  const width = endX - startX

  const margin = 50

  return (
    <div id='svgContainer'>
      <svg
        className='butterfly'
        style={{ margin: '3rem' }}
        width={width + margin * 2}
        height={upperHeight + lowerHeight + margin * 2}
        viewBox={[startX - margin,                    // x
                  -upperHeight - margin,              // y
                  width + margin,                     // width
                  upperHeight + lowerHeight + margin  // height
                 ].join(' ')}>
        <HorizontalRuler stretchX={stretchX} start={start} end={end} />

        {hasUpperDurations &&
          <>
            {upperDurations[0].degree ?
              <VerticalRuler x={startX} height={-upperHeight} stretchY={stretchY} minDegree={0} maxDegree={7} />
              :
              <VerticalRuler x={startX} height={-upperHeight} stretchY={stretchY} ticks={5} />
            }
            <Skyline
              stretchX={stretchX}
              stretchY={stretchY}
              durations={upperDurations}
              setDurations={setUpperDurations!} />
          </>
        }

        {hasLowerDurations &&
          <>
            <VerticalRuler x={startX} height={-upperHeight} stretchY={-stretchY} ticks={5} />
            <Skyline
              stretchX={stretchX}
              stretchY={-stretchY}
              durations={lowerDurations}
              setDurations={setLowerDurations!} />
          </>
        }
      </svg>
    </div>
  )
}
