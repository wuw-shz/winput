/**
 * Basic Usage Examples for winput
 *
 * Run with: bun run examples/basic-usage.ts
 */

import {
  moveTo,
  click,
  doubleClick,
  rightClick,
  moveRel,
  press,
  typewrite,
  keyDown,
  keyUp,
  position,
  size,
  config,
} from '../src/index'

console.log('🎮 winput - Basic Usage Examples\n')

// Disable failsafe for demo
config.FAILSAFE = false
config.PAUSE = 0.5 // Half second pause for visibility

// Example 1: Screen Information
console.log('📺 Screen Information:')
const [width, height] = size()
console.log(`   Screen size: ${width}x${height}`)
const [x, y] = position()
console.log(`   Current cursor position: (${x}, ${y})\n`)

// Example 2: Mouse Movement
console.log('🖱️  Mouse Movement:')
console.log('   Moving to (200, 200)...')
moveTo(200, 200)
console.log(`   New position: ${position()}\n`)

console.log('   Moving 100px right...')
moveRel(100, 0)
console.log(`   New position: ${position()}\n`)

// Example 3: Mouse Clicking
console.log('🖱️  Mouse Clicking:')
console.log('   Left click at (400, 400)...')
click(400, 400)

console.log('   Double click...')
doubleClick()

console.log('   Right click at (500, 500)...')
rightClick(500, 500)
console.log()

// Example 4: Keyboard Input
console.log('⌨️  Keyboard Input:')
console.log('   Pressing "a" key...')
press('a')

console.log('   Pressing Ctrl+C...')
press(['ctrl', 'c'])

console.log('   Typing text...')
typewrite('Hello from winput!', 0.1)
console.log()

// Example 5: Key Combinations
console.log('⌨️  Key Combinations:')
console.log('   Holding Shift and pressing keys...')
keyDown('shift')
press('h')
press('e')
press('l')
press('l')
press('o')
keyUp('shift')
console.log()

// Example 6: Drawing a Square (Mouse Drag)
console.log('🎨 Drawing a Square:')
console.log('   Starting at (600, 600)...')
const squareSize = 100
moveTo(600, 600)
console.log('   Drawing...')

// Right
moveRel(squareSize, 0)
// Down
moveRel(0, squareSize)
// Left
moveRel(-squareSize, 0)
// Up
moveRel(0, -squareSize)
console.log('   Square drawn!\n')

// Example 7: Configuration
console.log('⚙️  Configuration:')
console.log(`   Current PAUSE: ${config.PAUSE}s`)
console.log(`   Current FAILSAFE: ${config.FAILSAFE}`)
console.log(`   Failsafe points: ${JSON.stringify(config.FAILSAFE_POINTS)}\n`)

console.log('✅ All examples completed successfully!')
console.log(
  '\n💡 Tip: Enable fail-safe in production by setting config.FAILSAFE = true'
)
console.log(
  '   Move cursor to (0, 0) to trigger fail-safe and stop execution.\n'
)