import { position } from '../core'
import * as actions from './actions'
import { Listener } from './listener'

class Mouse {
  get position() {
    const pos = position()
    return { x: pos[0], y: pos[1] }
  }

  press = actions.press
  release = actions.release
  click = actions.click
  moveTo = actions.moveTo
  moveRel = actions.moveRel
  isPressed = actions.isPressed
  dragTo = actions.dragTo
  dragRel = actions.dragRel
  scroll = actions.scroll
  smoothMoveTo = actions.smoothMoveTo
  hold = actions.hold
  clickAt = actions.clickAt
  isAtPosition = actions.isAtPosition
  waitForPosition = actions.waitForPosition
  
  listener = new Listener()
}

export const mouse = new Mouse()
