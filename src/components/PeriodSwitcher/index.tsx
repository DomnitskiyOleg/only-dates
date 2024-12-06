import useMediaQuery from '../../hooks'
import classes from './switcher.module.scss'

type Props = {
  switchToNextPeriod: () => void
  switchToPreviousPeriod: () => void
  periodsAmount: number
  currentPeriod: number
}
export default function PeriodSwitcher(props: Props) {
  const {
    currentPeriod,
    periodsAmount,
    switchToNextPeriod,
    switchToPreviousPeriod,
  } = props

  const isMobile = useMediaQuery()

  return (
    <div className={classes.container}>
      <span
        className={classes.counter}
      >{`${currentPeriod}/${periodsAmount}`}</span>
      <div className={classes.bottonContainer}>
        <div onClickCapture={switchToPreviousPeriod} className={classes.button}>
          <img
            className={classes.icon}
            src={`/assets/icons/previous-icon${isMobile ? '-xs' : ''}.svg`}
            alt='previous-period'
          />
        </div>
        <div onClick={switchToNextPeriod} className={classes.button}>
          <img
            className={classes.icon}
            src={`/assets/icons/next-icon${isMobile ? '-xs' : ''}.svg`}
            alt='next-period'
          />
        </div>
      </div>
    </div>
  )
}
