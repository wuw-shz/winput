export const config = {
  // If true, moving the mouse to any point in FAILSAFE_POINTS will throw FailSafeException
  FAILSAFE: false,
  FAILSAFE_POINTS: [[0, 0]] as [number, number][],
  // If true, actions will perform a tiny pause after each call (see PAUSE_DELAY).
  PAUSE: true,
  // pause delay in milliseconds used by handlePause
  PAUSE_DELAY: 0, // ms
}
