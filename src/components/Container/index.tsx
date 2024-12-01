import { ReactNode } from 'react'
import classNames from 'classnames'
import styles from './container.module.scss'

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.square}>
      <div className={classNames(styles.line, styles.horizontal)} />
      <div className={classNames(styles.line, styles.vertical)} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
