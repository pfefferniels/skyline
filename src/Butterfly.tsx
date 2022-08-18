import React from "react"
import { Duration, DurationCluster } from "./Duration"
import { HorizontalRuler } from "./HorizontalRuler"
import { Skyline } from "./Skyline"
import { VerticalRuler } from "./VerticalRuler"

type ButterflyProps = {
  children: React.ReactNode
}

/**
 * Combines the `Skyline`s into a single SVG element 
 * and provides them with vertical and horizontal rulers.
 * 
 * @prop children - one or two `Skyline` elements to be parsed as "wings" of the Butterfly.
 */
export default function Butterfly(props: ButterflyProps) {
  const { children } = props

  let stretchX: number | undefined
  let stretchY: number | undefined
  let upperDurations: DurationCluster | undefined
  let lowerDurations: DurationCluster | undefined

  React.Children.forEach(children, (element, index) => {
    if (!React.isValidElement(element)) return

    if (index === 0) {
      stretchX = element.props.stretchX
      stretchY = element.props.stretchY
      upperDurations = element.props.durations
    }
    else if (index === 1) {
      lowerDurations = element.props.durations
    }
  })

  if (stretchX) console.log(stretchX)

  console.log(stretchX, stretchY, upperDurations, lowerDurations)

  if (!stretchX || !stretchY) {
    return (
      <p>both, stretchX and stretchY must be given.</p>
    )
  }

  if (!upperDurations && !lowerDurations) {
    return (
      <p>at least one Skyline needs to be present</p>
    )
  }

  const upperStart = upperDurations ? upperDurations.start() : 0
  const lowerStart = lowerDurations ? lowerDurations.start() : 0
  const upperEnd = upperDurations ? upperDurations.end() : 0
  const lowerEnd = lowerDurations ? lowerDurations.end() : 0
  const upperVerticalMax = upperDurations ? upperDurations.longestDuration() : 0
  const lowerVerticalMax = lowerDurations ? lowerDurations.longestDuration() : 0
  const upperHeight = stretchY * upperVerticalMax
  const lowerHeight = stretchY * lowerVerticalMax

  const start = lowerDurations ? Math.min(upperStart, lowerStart) : upperStart
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
        viewBox={[
          startX - margin,                    // x
          -upperHeight - margin,              // y
          width + margin,                     // width
          upperHeight + lowerHeight + margin  // height
        ].join(' ')}>
        <HorizontalRuler stretchX={stretchX} start={start} end={end} />

        {upperDurations && (
          upperDurations.hasDegrees() ?
            <VerticalRuler x={startX} height={-upperHeight} stretchY={stretchY} minDegree={0} maxDegree={7} />
            :
            <VerticalRuler x={startX} height={-upperHeight} stretchY={stretchY} ticks={5} />
        )}

        {lowerDurations && (
          lowerDurations.hasDegrees() ?
            <VerticalRuler x={startX} height={-lowerHeight} stretchY={-stretchY} minDegree={0} maxDegree={7} />
            :
            <VerticalRuler x={startX} height={-lowerHeight} stretchY={-stretchY} ticks={5} />
        )}

        {props.children}
      </svg>
    </div>
  )
}

