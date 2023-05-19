interface CursorProps {
    position: number
    height: number
}

export const Cursor = ({ height, position }: CursorProps) => {
    return (
        <line
            x1={position}
            x2={position}
            y1={-height}
            y2={height}
            stroke='black'
            strokeWidth={1}
        />
    )
}
