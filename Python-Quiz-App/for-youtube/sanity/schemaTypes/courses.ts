export const courses = {
    name: 'course',
    title: 'Courses',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Course Title',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'thumbnail',
        title: 'Thumbnail',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'youtubePlaylistUrl',
        title: 'YouTube Playlist URL',
        type: 'url',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'duration',
        title: 'Course Duration',
        type: 'string',
      },
      {
        name: 'topics',
        title: 'Topics Covered',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'difficulty',
        title: 'Difficulty Level',
        type: 'string',
        options: {
          list: [
            { title: 'Beginner', value: 'beginner' },
            { title: 'Intermediate', value: 'intermediate' },
            { title: 'Advanced', value: 'advanced' },
          ],
        }
      }
    ]
  }