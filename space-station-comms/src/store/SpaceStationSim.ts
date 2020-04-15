export class SpaceStationSim {
  private broadcast: (msg: string) => void
  public ready: boolean

  constructor (broadcaster: (msg: string) => void) {
    // We'll use this to send out messages to the user
    this.broadcast = broadcaster
    this.ready = false
  }

  private startScript = [
    3,
    'The Space Station has split in two!',
    2,
    'We\'re not sure how this happened...',
    1,
    '...the module we\'re all stranded on is rapidly loosing oxygen!',
    3,
    'I can see another section of the ISS is still intact!',
    2,
    'We need to figure out how to get us all off the damaged module.',
    1,
    'We only have 21 minutes before the oxygen runs out...',
    2,
    '...I\'ve looked everywhere but it seems only 2 spacesuits have survived intact...',
    1,
    'You\'ve got to help us figure this out before the time runs out!',
    5
  ]

  public startSimulation (callback: () => void) {
    this.broadcastScript(this.startScript, callback)
  }

  private broadcastScript (script: (string | number)[], callback: () => void) {
    console.dir(script)
    this.handleNextLine(0, callback)
  }

  private handleNextLine = (nextIndex: number, callback: () => void) => {
    if (nextIndex < this.startScript.length) {
      const line: string | number = this.startScript[nextIndex]
      switch (typeof line) {
        case 'string':
          this.broadcast(line)
          console.log(line)
          this.handleNextLine(nextIndex + 1, callback)
          break
        case 'number':
          setTimeout(this.handleNextLine, line * 1200, nextIndex + 1, callback)
          break
      }
    } else {
      callback()
    }
  }
}
