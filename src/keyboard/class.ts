import * as actions from './actions'
import { Listener } from './listener'

class Keyboard {
  press = actions.press
  release = actions.release
  tap = actions.tap
  repeatTap = actions.repeatTap
  write = actions.write
  isPressed = actions.isPressed
  hotkey = actions.hotkey
  hold = actions.hold
  isAnyPressed = actions.isAnyPressed
  areAllPressed = actions.areAllPressed
  waitForPress = actions.waitForPress
  waitForRelease = actions.waitForRelease
  toggleKey = actions.toggleKey
  getKeyState = actions.getKeyState
  releaseAll = actions.releaseAll

  listener = new Listener()
}

export const keyboard = new Keyboard()