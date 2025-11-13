import { KEYBOARD_MAPPING } from "../keyboard/mapping"

export type KeyEvent = {
  event: 'down' | 'up'
  name: keyof typeof KEYBOARD_MAPPING
  vk_code: number
  isKeyDown: boolean
}

export type KeyboardEvents = {
  down: KeyEvent
  up: KeyEvent
}

export type KeyboardCallback = (ev: KeyEvent) => void
