export type PeriodDate = {
  year: number
  eventDescription: string
}

export interface IPeriod {
  title: string
  startYear: number
  endYear: number
  dates: PeriodDate[]
}
