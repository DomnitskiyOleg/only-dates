import { ReactNode } from 'react'

import classes from './wrapper.module.scss'
import classNames from 'classnames'
import useMediaQuery from '../../hooks'

export default function MobileWrapper({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery()
  return (
    <div className={classNames({ [classes.mobileWrapper]: isMobile })}>
      {children}
    </div>
  )
}
