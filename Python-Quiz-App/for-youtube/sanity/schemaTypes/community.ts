import code from './code' // Import the code schema

export const community = {
  name: 'communityPost',
  title: 'Community Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'code' // Use the newly defined code type
        }
      ]
    },
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Question', value: 'question' },
          { title: 'Discussion', value: 'discussion' },
          { title: 'Resource', value: 'resource' }
        ]
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ]
}
