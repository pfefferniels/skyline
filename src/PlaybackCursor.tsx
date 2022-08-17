type PlaybackCursorProps = {
    stretchY: number 
    x: number
    ticks: number
    height: number
  }
  
  export function PlaybackCursor(props: PlaybackCursorProps) {
    const { stretchY, x, height } = props
  
    return (
      <g className='cursor'>
        <line x1={x} y1={10*stretchY} x2={x} y2={10*stretchY} stroke='black' strokeWidth='1' />
      </g>
    )
  }
  