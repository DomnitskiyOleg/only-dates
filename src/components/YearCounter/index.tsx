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
  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)

  useEffect(() => {
    const start = {
      value: startDate,
    }

    const end = {
      value: endDate,
    }

    gsap.to(start, {
      value: startYear,
      duration: 0.1,
      ease: 'power1.inOut',
      onUpdate: () => {
        setStartDate(Math.floor(start.value))
      },
    })

    gsap.to(end, {
      value: endYear,
      duration: 0.1,
      ease: 'power1.inOut',
      onUpdate: () => {
        setEndDate(Math.floor(end.value))
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
