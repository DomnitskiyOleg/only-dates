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

  const [periodIndex, setPeriodIndex] = useState<number>(0)
  const [activeIndex, setAcitveIndex] = useState(0)
  const [previousActiveIndex, setPreviousActiveIndex] = useState<number | null>(
    null,
  )

  const dates = useMemo(() => periods[periodIndex].dates, [periodIndex])
  const activePeriod = useMemo(() => periods[periodIndex], [periodIndex])

  const switchToNextPeriod = useCallback(() => {
    if (!periods[periodIndex + 1]) setPeriodIndex(0)
    setPeriodIndex((state) => state + 1)
  }, [periodIndex])

  const switchToPreviosPeriod = useCallback(() => {
    if (!periods[periodIndex - 1]) setPeriodIndex(periods.length)
    setPeriodIndex((state) => state - 1)
  }, [periodIndex])

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
      />
      <PeriodSwitcher
        switchToNextPeriod={switchToNextPeriod}
        switchToPreviousPeriod={switchToPreviosPeriod}
        periodsAmount={periods.length}
        currentPeriod={periodIndex + 1}
      />
      <DateSwiper dates={dates} />
    </Container>
  )
}
