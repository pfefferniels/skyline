type VerticalRulerProps = {
  stretchY: number 
  x: number
  ticks: number
  height: number
}

export function VerticalRuler(props: VerticalRulerProps) {
  const { stretchY, x, ticks, height } = props

  let nTicks = Math.max(1, Math.abs(Math.floor((height/stretchY)/ticks)) + 1)

  return (
    <g className='verticalRuler'>
      <line x1={x} y1={-nTicks*ticks*stretchY} x2={x} y2={nTicks*ticks*stretchY} stroke='black' strokeWidth='1' />
      {Array.from(Array(nTicks).keys()).map((i: number) => {
        return (
          <g key={`tick${i}`}>
            <text dominantBaseline='middle'
                  textAnchor='end' 
                  x={x-2}
                  y={-stretchY * ticks * i}
                  fontSize='12'>{ticks*i}</text>
            <line x1={x} y1={-stretchY * ticks * i}
                  x2={x+5} y2={-stretchY * ticks * i}
                  stroke='black'
                  strokeWidth='0.5'>{ticks*i}</line>
          </g>
        )
      })}
    </g>
  )
}
