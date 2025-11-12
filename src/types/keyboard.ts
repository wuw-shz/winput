export type KeyEvent = {
  event: 'down' | 'up'
  name: string
  vk_code: number
  isKeyDown: boolean
}

export type KeyboardEvents = {
  keydown: KeyEvent
  keyup: KeyEvent
}

export type KeyboardCallback = (ev: KeyEvent) => void
