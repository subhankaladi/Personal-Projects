export const quiz = {
    name: 'quiz',
    title: 'Quiz',
    type: 'document',
    fields: [
      {
        name: 'day',
        title: 'Day',
        type: 'number',
      },
      {
        name: 'quizzes',
        title: 'Quizzes',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'quiz',
            fields: [
              {
                name: 'question',
                title: 'Question',
                type: 'string',
              },
              {
                name: 'options',
                title: 'Options',
                type: 'array',
                of: [{ type: 'string' }],
              },
              {
                name: 'correctAnswer',
                title: 'Correct Answer Index',
                type: 'number',
              },
            ],
          },
        ],
      },
    ],
  }