import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import classes from './circle.module.scss'
import { IPeriod } from '../../mock-data/types'
import { getPeriodCoordinates } from '../../helpers'

type Props = {
  periods: IPeriod[]
  currentPeriodIndex: number
  previosPeriodIndex: number | null
  setActivePeriodIndex: (v: number) => void
  setPreviousPeriodIndex: (v: number) => void
  setExternalRotation: (state: boolean) => void
  isExternalRotation: boolean
}

export default function Circle(props: Props) {
  const {
    periods,
    currentPeriodIndex,
    previosPeriodIndex,
    setActivePeriodIndex,
    setPreviousPeriodIndex,
    isExternalRotation,
    setExternalRotation,
  } = props

  const periodAngle = useMemo(() => {
    return 360 / periods.length
  }, [periods])

  const visibleCirclesRef = useRef<HTMLDivElement[]>([])
  const labelsRef = useRef<HTMLDivElement[]>([])
  const mainCircleRef = useRef<HTMLDivElement>(null)

  const [lastRotationAngle, setLastRotationAngle] = useState(0)

  const openCircle = useCallback((index: number) => {
    gsap.to(visibleCirclesRef.current[index], {
      width: 56,
      height: 56,
      backgroundColor: '#F5F5F5',
      duration: 0.5,
      ease: 'none',
    })
  }, [])

  const closeCircle = useCallback((index: number) => {
    gsap.to(visibleCirclesRef.current[index], {
      width: 6,
      height: 6,
      backgroundColor: '#42567A',
      duration: 0.5,
      ease: 'none',
    })
  }, [])

  const hidePreviousLabel = useCallback(() => {
    if (typeof previosPeriodIndex !== 'number') return
    gsap.to(labelsRef.current[previosPeriodIndex], {
      opacity: 0,
      duration: 0.2,
      ease: 'none',
    })
  }, [previosPeriodIndex])

  const showLabel = useCallback(() => {
    gsap.to(labelsRef.current[currentPeriodIndex], {
      opacity: 1,
      duration: 0.1,
      delay: 0.9,
      ease: 'none',
    })
  }, [currentPeriodIndex])

  const rotateToPeriod = useCallback(
    (newActiveIndex: number, oldPeriodIndex: number) => {
      if (!mainCircleRef.current) return

      const rotateAngle = (oldPeriodIndex - newActiveIndex) * periodAngle

      closeCircle(oldPeriodIndex)
      setLastRotationAngle(rotateAngle + lastRotationAngle)
      mainCircleRef.current.style.transform = `rotate(${
        rotateAngle + lastRotationAngle
      }deg)`
    },
    [closeCircle, lastRotationAngle, periodAngle],
  )

  const needToRotate =
    typeof previosPeriodIndex === 'number' &&
    isExternalRotation &&
    currentPeriodIndex !== previosPeriodIndex

  useEffect(() => {
    openCircle(currentPeriodIndex)
    hidePreviousLabel()
    showLabel()
  }, [currentPeriodIndex, openCircle, hidePreviousLabel, showLabel])

  useEffect(() => {
    console.log()
    if (needToRotate) {
      setExternalRotation(false)
      rotateToPeriod(currentPeriodIndex, previosPeriodIndex)
    }
  }, [
    rotateToPeriod,
    needToRotate,
    currentPeriodIndex,
    previosPeriodIndex,
    setExternalRotation,
  ])

  return (
    <div className={classes.container}>
      <div ref={mainCircleRef} className={classes.outerCircle}>
        {periods.map((v, i) => {
          const coordinates = getPeriodCoordinates(periods.length, i)

          return (
            <div
              onMouseEnter={() => openCircle(i)}
              onMouseLeave={() => {
                if (i === currentPeriodIndex) return
                closeCircle(i)
              }}
              onClick={() => {
                if (i === currentPeriodIndex) return
                setExternalRotation(false)
                rotateToPeriod(i, currentPeriodIndex)
                setPreviousPeriodIndex(currentPeriodIndex)
                setActivePeriodIndex(i)
              }}
              key={i}
              className={classes.smallCircleBase}
              style={{
                left: coordinates.x,
                top: coordinates.y,
                transform: `rotate(${-lastRotationAngle}deg)`,
              }}
            >
              <div
                ref={(el) => {
                  if (!el) return
                  visibleCirclesRef.current[i] = el
                }}
                className={classes.smallCircleVisible}
              >
                <p className={classes.period}>{i + 1}</p>
              </div>
              <p
                ref={(el) => {
                  if (!el) return
                  labelsRef.current[i] = el
                }}
                className={classes.label}
                style={{ opacity: 0 }}
              >
                {v.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
