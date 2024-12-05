import { periods } from '../mock-data'

import { useCallback, useMemo, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import {
  Circle,
  Container,
  DateSwiper,
  PeriodSwitcher,
  Title,
  YearCounter,
} from '../components'

export default function OnlyDates() {
  const isMobile = useMediaQuery()

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
    setIsExternalRotation(true)

    setPreviousActiveIndex(activeIndex)
    if (!periods[activeIndex + 1]) {
      setAcitveIndex(0)
      return
    }
    setAcitveIndex((state) => state + 1)
  }, [activeIndex])

  const switchToPreviosPeriod = useCallback(() => {
    setIsExternalRotation(true)

    setPreviousActiveIndex(activeIndex)
    if (!periods[activeIndex - 1]) {
      setAcitveIndex(periods.length - 1)
      return
    }
    setAcitveIndex((state) => state - 1)
  }, [activeIndex])

  const setActivePeriodIndex = useCallback((index: number) => {
    setAcitveIndex(index)
  }, [])

  const setPreviousPeriodIndex = useCallback((index: number) => {
    setPreviousActiveIndex(index)
  }, [])

  return (
    <Container>
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
      />
      <PeriodSwitcher
        switchToNextPeriod={switchToNextPeriod}
        switchToPreviousPeriod={switchToPreviosPeriod}
        periodsAmount={periods.length}
        currentPeriod={activeIndex + 1}
      />
      <DateSwiper dates={dates} />
    </Container>
  )
}
