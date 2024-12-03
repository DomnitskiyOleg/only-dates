// start angle from 12 o'clock position
const START_ANGLE = 30
const LARGE_CIRCLE_RADIUS = 265
const SMALL_CIRCLE_RADIUS = 28

export const getPeriodCoordinates = (
  periodsAmount: number,
  periodIndex: number,
) => {
  const angle = (periodIndex * 360) / periodsAmount - (90 - START_ANGLE)
  const x =
    LARGE_CIRCLE_RADIUS +
    LARGE_CIRCLE_RADIUS * Math.cos((angle * Math.PI) / 180) -
    SMALL_CIRCLE_RADIUS
  const y =
    LARGE_CIRCLE_RADIUS +
    LARGE_CIRCLE_RADIUS * Math.sin((angle * Math.PI) / 180) -
    SMALL_CIRCLE_RADIUS
  return { x, y }
}
