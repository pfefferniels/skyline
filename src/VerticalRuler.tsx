type VerticalRulerProps = {
  stretchY: number
  x: number
  ticks?: number
  minDegree?: number
  maxDegree?: number
  height: number
}

export function VerticalRuler(props: VerticalRulerProps) {
  const { stretchY, x, ticks, minDegree, maxDegree, height } = props

  console.log(minDegree, maxDegree)

  if (minDegree !== undefined && maxDegree !== undefined) {
    return (
      <g className='verticalRuler'>
        {Array.from(Array(Math.abs(Math.round(maxDegree - minDegree))).keys()).map((i: number) => {
          const posY = (i+1) * -stretchY

          let label = (i+1).toString()
          switch (i+1) {
            case 7: label = 'VII'; break;
            case 6: label = 'VI'; break;
            case 5: label = 'V'; break;
            case 4: label = 'IV'; break;
            case 3: label = 'III'; break;
            case 2: label = 'II'; break;
            case 1: label = 'I'; break;
          }

          return (
            <text
              dominantBaseline='middle'
              textAnchor='start'
              x={Math.floor(x)-10}
              y={posY}
              fontSize={10}>
              {label}
            </text>
          )
        })}
      </g>
    )
  }
  else if (ticks) {
    let nTicks = Math.max(1, Math.abs(Math.floor((height / stretchY) / ticks)) + 1)
    return (
      <g className='verticalRuler'>
        <line 
          x1={x} y1={-nTicks * ticks * stretchY}
          x2={x} y2={nTicks * ticks * stretchY}
          stroke='black'
          strokeWidth='1' />
        {
          Array.from(Array(nTicks).keys()).map((i: number) => {
            return (
              <g key={`tick${i}`}>
                <text
                  dominantBaseline='middle'
                  textAnchor='end'
                  x={x - 2}
                  y={-stretchY * ticks * i}
                  fontSize='12'>{ticks * i}</text>
                <line
                  x1={x} y1={-stretchY * ticks * i}
                  x2={x + 5} y2={-stretchY * ticks * i}
                  stroke='black'
                  strokeWidth='0.5'>{ticks * i}</line>
              </g>
            )
          })
        }
      </g >
    )
  }

  return null
}
