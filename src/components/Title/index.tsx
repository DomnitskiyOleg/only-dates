import classes from './title.module.scss'

export default function Title() {
  return (
    <div className={classes.container}>
      <div className={classes.strip} />
      <h1>Исторические даты</h1>
    </div>
  )
}
