export const subscriber = {
    name: 'subscriber',
    title: 'Subscribers',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: any) => Rule.required().email()
      },
      {
        name: 'subscribedAt',
        title: 'Subscribed At',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
        },
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Active', value: 'active' },
            { title: 'Unsubscribed', value: 'unsubscribed' }
          ],
        },
        initialValue: 'active'
      }
    ]
  }