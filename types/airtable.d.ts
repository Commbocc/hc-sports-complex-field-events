interface IRawEvent {
  id: string
  createdTime: string
  fields: {
    Field?: string[]
    Date?: string
    Name?: string
    FieldName?: string[]
    LocationUid?: string[]
    Created?: string
    'Created By'?: IAirtableUser
    'Last Modified'?: string
    'Last Modified By'?: IAirtableUser
  }
}
interface IAirtableUser {
  id: string
  email: string
  name: string
}
