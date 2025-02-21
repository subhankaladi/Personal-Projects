export const notes = {
    name: "note",
    title: "Class Note",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "class",
        title: "Class",
        type: "string",
      },
      {
        name: "images",
        title: "Images",
        type: "array",
        of: [{ type: "image" }],
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "date",
        title: "Date",
        type: "datetime",
      },
    ],
  };