import { ReactNode } from 'react'
import classNames from 'classnames'
import classes from './container.module.scss'

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <div className={classes.square}>
      <div className={classNames(classes.line, classes.horizontal)} />
      <div className={classNames(classes.line, classes.vertical)} />
      <div className={classes.content}>{children}</div>
    </div>
  )
}
