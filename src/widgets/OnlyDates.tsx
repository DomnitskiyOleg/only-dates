import { periods } from '../mock-data'

import { useCallback, useMemo, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import {
  Circle,
  Container,
  DateSwiper,
  MobileWrapper,
  PeriodSwitcher,
  Title,
  YearCounter,
} from '../components'

export default function OnlyDates() {
  const isMobile = useMediaQuery()
  const [isActionsBlocked, setIsActionBlocked] = useState(false)
  const [activeIndex, setAcitveIndex] = useState(0)
  const [isExternalRotation, setIsExternalRotation] = useState(true)
  const [previousActiveIndex, setPreviousActiveIndex] = useState<number | null>(
    null,
  )

  const dates = useMemo(() => periods[activeIndex].dates, [activeIndex])
  const activePeriod = useMemo(() => periods[activeIndex], [activeIndex])

  const setExternalRotation = useCallback((value: boolean) => {
    setIsExternalRotation(value)
  }, [])

  const switchToNextPeriod = useCallback(() => {
    if (isActionsBlocked) return
    setIsActionBlocked(true)

    setIsExternalRotation(true)
    setPreviousActiveIndex(activeIndex)
    if (!periods[activeIndex + 1]) {
      setAcitveIndex(0)
      return
    }
    setAcitveIndex((state) => state + 1)
  }, [activeIndex, isActionsBlocked])

  const switchToPreviosPeriod = useCallback(() => {
    if (isActionsBlocked) return
    setIsActionBlocked(true)

    setIsExternalRotation(true)
    setPreviousActiveIndex(activeIndex)
    if (!periods[activeIndex - 1]) {
      setAcitveIndex(periods.length - 1)
      return
    }
    setAcitveIndex((state) => state - 1)
  }, [activeIndex, isActionsBlocked])

  const setActivePeriodIndex = useCallback((index: number) => {
    setAcitveIndex(index)
  }, [])
  const setPreviousPeriodIndex = useCallback((index: number) => {
    setPreviousActiveIndex(index)
  }, [])

  return (
    <Container>
      <MobileWrapper>
        <Title />
        <YearCounter
          startYear={activePeriod.startYear}
          endYear={activePeriod.endYear}
        />

        <Circle
          periods={periods}
          setActivePeriodIndex={setActivePeriodIndex}
          setPreviousPeriodIndex={setPreviousPeriodIndex}
          previosPeriodIndex={previousActiveIndex}
          currentPeriodIndex={activeIndex}
          isExternalRotation={isExternalRotation}
          setExternalRotation={setExternalRotation}
          setActionBlock={(value) => {
            setIsActionBlocked(value)
          }}
        />
        {isMobile && <DateSwiper title={activePeriod.title} dates={dates} />}
        {!isMobile && (
          <PeriodSwitcher
            switchToNextPeriod={switchToNextPeriod}
            switchToPreviousPeriod={switchToPreviosPeriod}
            periodsAmount={periods.length}
            currentPeriod={activeIndex + 1}
          />
        )}
      </MobileWrapper>
      {!isMobile && <DateSwiper dates={dates} />}
      {isMobile && (
        <PeriodSwitcher
          switchToNextPeriod={switchToNextPeriod}
          switchToPreviousPeriod={switchToPreviosPeriod}
          periodsAmount={periods.length}
          currentPeriod={activeIndex + 1}
        />
      )}
    </Container>
  )
}
