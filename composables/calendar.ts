import { DateTime, Interval, LocaleOptions } from 'luxon'

export const useCalendar = () => {
  // Sunday
  const weekStartOn = DateTime
    /* test date */
    // .fromISO('2023-09-01')
    .local()
    .set({ weekday: 0 })

  // Saturday
  const weekEndOn = DateTime
    /* test date */
    // .fromISO('2023-09-01')
    .local()
    .set({ weekday: 7 })
  // .plus({ days: 1 })

  // console.log({ weekStartOn, weekEndOn })

  const thisWeek: string[] = Interval.fromDateTimes(weekStartOn, weekEndOn)
    .splitBy({ day: 1 })
    .map((date: Interval) => date?.start?.toISODate() ?? '')

  return { weekStartOn, weekEndOn, thisWeek, formatIso }
}

function formatIso(
  iso: string,
  fmt: string = 'ccc DD',
  opts?: LocaleOptions | undefined
) {
  return DateTime.fromISO(iso).toFormat(fmt, opts)
}
