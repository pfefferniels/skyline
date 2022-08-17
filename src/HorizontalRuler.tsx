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
  const numberOfTicks = Math.round((end - start) / 10) + 1
  const tickHeight = 6

  return (
    <g className='horizontalRuler'>
      <line
        y1={0}
        x1={start * stretchX}
        y2={0}
        x2={end * stretchX}
        stroke='black'
        strokeWidth='1' />
      {Array.from(Array(numberOfTicks).keys()).map((i: number) => {
        // calculate the i-th tick position in second
        const firstTick = Math.round(start)
        const currentTickPosition = firstTick + i * 10
        const date = new Date(currentTickPosition * 1000).toISOString().substr(15, 4)
        return (
          <g key={`tick${i}`}>
            <text
              dominantBaseline='middle'
              textAnchor='middle'
              y={tickHeight + 5}
              x={stretchX * currentTickPosition}
              fontSize='10'>{date}</text>
            <line
              y1={0} x1={stretchX * currentTickPosition}
              y2={tickHeight} x2={stretchX * currentTickPosition}
              stroke='black'
              strokeWidth='0.5' />
          </g>
        )
      })}
    </g>
  )
}