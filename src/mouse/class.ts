import { position } from '../core'
import * as actions from './actions'
import { Listener } from './listener'

class Mouse {
  get position() {
    const pos = position()
    return { x: pos[0], y: pos[1] }
  }

  down = actions.down
  up = actions.up
  click = actions.click
  moveTo = actions.moveTo
  moveRel = actions.moveRel

  listener = new Listener()
}

export const mouse = new Mouse()
