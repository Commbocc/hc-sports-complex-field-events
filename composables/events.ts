import { useCalendar } from './calendar'

const events = reactive<{
  loading: boolean
  records: FieldEvent[]
}>({
  loading: false,
  records: [],
})

export const useEvents = () => {
  const { $airtable } = useNuxtApp()
  const { params } = useRoute()
  const { weekStartOn, weekEndOn } = useCalendar()

  /**
   *
   */
  const fetchEvents = async () => {
    events.loading = true

    try {
      const andClause = [
        `ARRAYJOIN({LocationSlug}) = '${params.locationSlug}'`,
        `IS_AFTER({Date}, '${weekStartOn.minus({ days: 1 }).toISODate()}')`,
        `IS_BEFORE({Date}, '${weekEndOn.plus({ days: 1 }).toISODate()}')`,
      ].join(', ')

      const { data } = await $airtable.get('/tblS4WDyWR4044iHE', {
        params: {
          filterByFormula: `AND(${andClause})`,
          'sort[0][field]': 'FieldName',
          'sort[0][direction]': 'asc',
          'sort[1][field]': 'Date',
          'sort[1][direction]': 'asc',
          view: 'Grid view',
        },
      })

      events.records = data.records.map((r: IRawEvent) => new FieldEvent(r))
    } catch (error) {
      console.log(error)
    } finally {
      events.loading = false
    }
  }

  /**
   *
   */
  const groupedEvents = computed(() => {
    return events.records.reduce(
      (group: { [key: string]: FieldEvent[] }, item) => {
        if (!group[item.field]) {
          group[item.field] = []
        }
        group[item.field].push(item)
        return group
      },
      {}
    )
  })

  return { events, groupedEvents, fetchEvents }
}

/**
 *
 */
export class FieldEvent {
  name: string
  date: string
  field: string
  location: string

  constructor(_event: IRawEvent) {
    this.name = _event.fields.Name!
    this.date = _event.fields.Date!
    this.field = _event.fields.FieldName?.[0] ?? ''
    this.location = _event.fields.LocationSlug?.[0]!
  }
}
