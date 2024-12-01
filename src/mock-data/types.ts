export type PeriodDate = {
  year: number
  eventDescription: string
}

export interface IPeriod {
  title: string
  startDate: number
  endDate: number
  dates: PeriodDate[]
}
