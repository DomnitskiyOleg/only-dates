import { useEffect, useState } from 'react'
import classes from './years.module.scss'
import classNames from 'classnames'
import gsap from 'gsap'

type Props = {
  startYear: number
  endYear: number
}
export default function YearCounter(props: Props) {
  const { startYear, endYear } = props
  const [startDate, setStartDate] = useState(1000)
  const [endDate, setEndDate] = useState(1000)

  useEffect(() => {
    const startValues = {
      start: startDate,
      end: endDate,
    }
    gsap.to(startValues, {
      start: startYear,
      end: endYear,
      ease: 'none',
      onUpdate: () => {
        setStartDate(Math.floor(startValues.start))
        setEndDate(Math.floor(startValues.end))
      },
    })
  }, [startYear, endYear, endDate, startDate])
  return (
    <div className={classes.positionBlock}>
      <div className={classes.test} />
      <div className={classes.container}>
        <span className={classNames(classes.year, classes.start)}>
          {startDate}
        </span>
        <span className={classNames(classes.year, classes.end)}>{endDate}</span>
      </div>
    </div>
  )
}
