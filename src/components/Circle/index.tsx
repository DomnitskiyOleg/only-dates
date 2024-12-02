import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './styles.scss'
import { relative } from 'path'

// start angle from 12 o'clock position
const START_ANGLE = 30
const LARGE_CIRCLE_RADIUS = 265
const SMALL_CIRCLE_RADIUS = 16

export default function Circle({
  numberOfCircles,
}: {
  numberOfCircles: number
}) {
  const periodAngle = useMemo(() => {
    return 360 / numberOfCircles
  }, [numberOfCircles])
  const elementsRef = useRef<HTMLDivElement[]>([])

  const smallCircleRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  const [lastRotationAngle, setLastRotationAngle] = useState(0)
  const [activeIndex, setAcitveIndex] = useState(0)

  const onMouseEnter = useCallback((index: number) => {
    gsap.to(elementsRef.current[index], {
      width: 56,
      height: 56,
      opacity: 0,
      duration: 0.5,
      ease: 'none',
    })
    console.log(123)
  }, [])

  const onMouseLeave = useCallback((index: number) => {
    gsap.to(elementsRef.current[index], {
      width: 6,
      height: 6,
      opacity: 1,
      duration: 0.5,
      ease: 'none',
    })
    console.log(123)
  }, [])

  const onClick = useCallback(
    (newActiveIndex: number) => {
      if (!circleRef.current) return
      const rotateAngle = (activeIndex - newActiveIndex) * periodAngle
      setAcitveIndex(newActiveIndex)
      setLastRotationAngle(rotateAngle + lastRotationAngle)

      circleRef.current.style.transform = `rotate(${
        rotateAngle + lastRotationAngle
      }deg)`
    },
    [activeIndex, periodAngle, lastRotationAngle],
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

  return (
    <div className='container'>
      <div ref={circleRef} className='outer-circle'>
        {circles.map((circle, index) => (
          <div
            onClick={() => {
              if (index === activeIndex) return
              onClick(index)
            }}
            key={index}
            className='small-circle'
            style={{
              left: circle.x,
              top: circle.y,
              transform: `rotate(${-lastRotationAngle}deg)`,
              backgroundColor: 'gainsboro',
              //   overflow: 'hidden',
            }}
          >
            <div
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={() => onMouseLeave(index)}
              ref={(el) => {
                if (!el) return
                elementsRef.current[index] = el
              }}
              style={{
                position: 'absolute',
                width: 6,
                height: 6,
                top: '50%',
                left: '50%',
                borderRadius: '50%',
                transform: ' translate(-50%, -50%)',
                backgroundColor: '#42567A',
                overflow: 'hidden',
              }}
            >
              <p
                style={{
                  position: 'relative',
                  margin: 'auto',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {index}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
