export class CommsChannel {
  private listeners: ((msg: string) => void)[] = []

  public broadcast (msg: string) {
    for (const msgHandler of this.listeners) {
      msgHandler(msg)
    }
  }

  public subscribe (msgHandler: ((msg: string) => void)) {
    this.listeners.push(msgHandler)
  }

  public unsubscribe (msgHandler: ((msg: string) => void)) {
    this.listeners = this.listeners.filter((handler: ((msg: string) => void)) => {
      return handler !== msgHandler
    })
  }
}
