import Circle from '../components/Circle'
import Container from '../components/Container'
import { periods } from '../mock-data'
import { PeriodDate } from '../mock-data/types'
import { useCallback, useMemo, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

import DateSwiper from '../components/Swiper'
import PeriodSwitcher from '../components/PeriodSwitcher'
import Title from '../components/Title'

export default function OnlyDates() {
  const isMobile = useMediaQuery()

  const [periodIndex, setPeriodIndex] = useState<number>(0)
  const [activeIndex, setAcitveIndex] = useState(0)
  const [previousActiveIndex, setPreviousActiveIndex] = useState<number | null>(
    null,
  )

  const dates = useMemo(() => periods[periodIndex].dates, [periodIndex])

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
