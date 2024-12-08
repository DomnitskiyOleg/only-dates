import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  setActionBlock: (state: boolean) => void
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
    setActionBlock,
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

  const hidePreviousLabel = useCallback((index: number) => {
    gsap.to(labelsRef.current[index], {
      opacity: 0,
      duration: 0.2,
      ease: 'none',
    })
  }, [])

  const showLabel = useCallback(
    (index: number) => {
      gsap.to(labelsRef.current[index], {
        opacity: 1,
        duration: 0.1,
        delay: 0.9,
        ease: 'none',
        onComplete: () => {
          setActionBlock(false)
        },
      })
    },
    [setActionBlock],
  )

  const rotateToPeriod = useCallback(
    (newActiveIndex: number, oldPeriodIndex: number) => {
      if (!mainCircleRef.current) return

      const rotateAngle = (oldPeriodIndex - newActiveIndex) * periodAngle

      closeCircle(oldPeriodIndex)
      hidePreviousLabel(oldPeriodIndex)
      showLabel(newActiveIndex)
      setLastRotationAngle(rotateAngle + lastRotationAngle)
      mainCircleRef.current.style.transform = `rotate(${
        rotateAngle + lastRotationAngle
      }deg)`
    },
    [closeCircle, lastRotationAngle, periodAngle, hidePreviousLabel, showLabel],
  )

  const needToRotate =
    typeof previosPeriodIndex === 'number' &&
    isExternalRotation &&
    currentPeriodIndex !== previosPeriodIndex

  const onCircleClick = useCallback(
    (index: number) => () => {
      if (index === currentPeriodIndex) return

      setExternalRotation(false)
      rotateToPeriod(index, currentPeriodIndex)
      setPreviousPeriodIndex(currentPeriodIndex)
      setActivePeriodIndex(index)
    },
    [
      currentPeriodIndex,
      setExternalRotation,
      rotateToPeriod,
      setPreviousPeriodIndex,
      setActivePeriodIndex,
    ],
  )

  useEffect(() => {
    openCircle(currentPeriodIndex)
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
    openCircle,
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
              onClick={onCircleClick(i)}
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
