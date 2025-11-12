import { onKeyboard, onMouse, stopAllListening } from '../src/listeners'

// Example: keyboard listener
const stopKeyboard = onKeyboard((event) => {
  if (event.type === 'keydown') {
    console.log(`[KEYDOWN] vkCode=${event.vkCode}`)

    // Example: Stop listening when ESC is pressed (vkCode 27)
    if (event.vkCode === 27) {
      console.log('ESC pressed → stopping all listeners')
      stopAllListening()
      process.exit(0)
    }
  } else if (event.type === 'keyup') {
    console.log(`[KEYUP] vkCode=${event.vkCode}`)
  }
})

// Example: mouse listener
const stopMouse = onMouse((event) => {
  switch (event.type) {
    case 'move':
      // For performance, throttle logs (just every 200 ms)
      if (!onMouse.lastLogTime || Date.now() - onMouse.lastLogTime > 200) {
        console.log(`Mouse moved: x=${event.x}, y=${event.y}`)
        ;(onMouse as any).lastLogTime = Date.now()
      }
      break

    case 'down':
    case 'up':
      console.log(`Mouse ${event.type}: ${event.button}`)
      break

    case 'wheel':
      console.log(`Mouse wheel: delta=${event.delta}`)
      break
  }
})

console.log(
  '✅ Input listeners active. Move mouse or press keys (ESC to exit).'
)
