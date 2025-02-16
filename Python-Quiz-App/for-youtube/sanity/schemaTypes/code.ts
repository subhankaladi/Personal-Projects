export default {
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'Python', value: 'python' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Bash', value: 'bash' },
          // Add more languages as needed
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
  ],
} 