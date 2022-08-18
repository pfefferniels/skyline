export type Duration = {
  start: number
  end: number
  color: string
  selected: boolean
  label?: string
  degree?: number
}

export class DurationCluster {
  durations: Duration[]

  constructor(durations: Duration[]) {
    this.durations = durations
  }

  removeDuration(duration: Duration) {
    const index = this.durations.indexOf(duration)
    if (index !== -1) {
      this.durations.splice(index, 1)
    }
  }

  sort() {
    const compareDurations = (a: Duration, b: Duration) => {
      const lengthA = a.end - a.start 
      const lengthB = b.end - b.start
      return lengthB - lengthA
    }
    
    return this.durations.sort(compareDurations)
  }

  unselectAll() {
    this.durations.forEach(d => d.selected = false)
  }

  hasDegrees() {
    if (this.durations.length > 0) {
      return this.durations[0].degree !== undefined
    }
    return false
  }

  longestDuration() {
    return Math.max(...this.durations.map(d => d.end - d.start))
  }

  start() {
    return Math.min(...this.durations.map(d => d.start))
  }

  end() {
    return Math.max(...this.durations.map(d => d.end))
  }
}
