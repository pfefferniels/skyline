import { useContext } from "react"
import { SettingsContext } from "./SettingsContext"

type HorizontalRulerProps = {
  start: number
  end: number
  stretchX: number
}

/**
 * Draws a horizontal axis with ticks.
 */
export function HorizontalRuler(props: HorizontalRulerProps) {
  const { start, end, stretchX } = props
  const tickHeight = 6

  const { horizontalTicks } = useContext(SettingsContext)

  if (isNaN(start) || isNaN(end) || end <= start) return null

  const ticks = []
  for (let current = start; current <= end; current += horizontalTicks) {
    ticks.push(current)
  }

  return (
    <g className='horizontalRuler'>
      <line
        y1={0}
        x1={start * stretchX}
        y2={0}
        x2={end * stretchX}
        stroke='black'
        strokeWidth='1' />
      {Array.from(ticks).map((time: number) => {
        // calculate the i-th tick position in seconds
        const currentTickPosition = time * stretchX
        const date = new Date(time * 1000).toTimeString().substr(3, 5)
        return (
          <g key={`tick${time}`} data-time={time}>
            <text
              dominantBaseline='middle'
              textAnchor='middle'
              y={tickHeight + 5}
              x={currentTickPosition}
              fontSize='10'>{date}</text>
            <line
              y1={0} x1={currentTickPosition}
              y2={tickHeight} x2={currentTickPosition}
              stroke='black'
              strokeWidth='0.5' />
          </g>
        )
      })}
    </g>
  )
}