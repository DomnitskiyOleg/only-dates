import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import classes from './circle.module.scss'

// start angle from 12 o'clock position
const START_ANGLE = 30
const LARGE_CIRCLE_RADIUS = 265
const SMALL_CIRCLE_RADIUS = 28

type Props = {
  numberOfCircles: number
  currentPeriodIndex: number
  previosPeriodIndex: number | null
  setActivePeriodIndex: (v: number) => void
  setPreviousPeriodIndex: (v: number) => void
}
export default function Circle(props: Props) {
  const {
    numberOfCircles,
    currentPeriodIndex,
    previosPeriodIndex,
    setActivePeriodIndex,
    setPreviousPeriodIndex,
  } = props
  const periodAngle = useMemo(() => {
    return 360 / numberOfCircles
  }, [numberOfCircles])
  const elementsRef = useRef<HTMLDivElement[]>([])

  const circleRef = useRef<HTMLDivElement>(null)

  const [lastRotationAngle, setLastRotationAngle] = useState(0)

  const openCircle = useCallback((index: number) => {
    gsap.to(elementsRef.current[index], {
      width: 56,
      height: 56,
      backgroundColor: '#F5F5F5',
      duration: 0.5,
      ease: 'none',
    })
  }, [])

  const closeCircle = useCallback((index: number) => {
    gsap.to(elementsRef.current[index], {
      width: 6,
      height: 6,
      backgroundColor: '#42567A',
      duration: 0.5,
      ease: 'none',
    })
  }, [])

  const onClick = useCallback(
    (newActiveIndex: number) => {
      if (!circleRef.current) return

      const rotateAngle = (currentPeriodIndex - newActiveIndex) * periodAngle

      closeCircle(currentPeriodIndex)
      setPreviousPeriodIndex(currentPeriodIndex)
      setActivePeriodIndex(newActiveIndex)
      setLastRotationAngle(rotateAngle + lastRotationAngle)

      circleRef.current.style.transform = `rotate(${
        rotateAngle + lastRotationAngle
      }deg)`
    },
    [
      currentPeriodIndex,
      closeCircle,
      lastRotationAngle,
      periodAngle,
      setActivePeriodIndex,
      setPreviousPeriodIndex,
    ],
  )

  const circles = Array.from({ length: numberOfCircles }, (_, i) => {
    const angle = (i * 360) / numberOfCircles - (90 - START_ANGLE)
    const x =
      LARGE_CIRCLE_RADIUS +
      LARGE_CIRCLE_RADIUS * Math.cos((angle * Math.PI) / 180) -
      SMALL_CIRCLE_RADIUS
    const y =
      LARGE_CIRCLE_RADIUS +
      LARGE_CIRCLE_RADIUS * Math.sin((angle * Math.PI) / 180) -
      SMALL_CIRCLE_RADIUS
    return { x, y }
  })

  useEffect(() => {
    openCircle(currentPeriodIndex)
  }, [currentPeriodIndex, openCircle, previosPeriodIndex])

  return (
    <div className={classes.container}>
      <div ref={circleRef} className={classes.outerCircle}>
        {circles.map((circle, index) => (
          <div
            onMouseEnter={() => openCircle(index)}
            onMouseLeave={() => {
              if (index === currentPeriodIndex) return
              closeCircle(index)
            }}
            onClick={() => {
              if (index === currentPeriodIndex) return
              onClick(index)
            }}
            key={index}
            className={classes.smallCircleBase}
            style={{
              left: circle.x,
              top: circle.y,
              transform: `rotate(${-lastRotationAngle}deg)`,
            }}
          >
            <div
              ref={(el) => {
                if (!el) return
                elementsRef.current[index] = el
              }}
              className={classes.smallCircleVisible}
            >
              <p className={classes.period}>{index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
