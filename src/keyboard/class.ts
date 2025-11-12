import * as actions from './actions'
import { Listener } from './listener'

class Keyboard {
  down = actions.down
  up = actions.up
  press = actions.press
  write = actions.write

  listener = new Listener()
}

export const keyboard = new Keyboard()