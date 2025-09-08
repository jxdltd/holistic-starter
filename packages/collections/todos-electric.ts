import { createCollection } from "@tanstack/react-db";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createTodo } from "@repo/functions/todos";

export const todosElectricCollection = createCollection(
  electricCollectionOptions({
    shapeOptions: {
      url: "http://localhost:3000/api/shapes/todos",
      onError: (error) => {
        console.error("error", error);
      },
    },
    getKey: (item) => item.id as string,
    onInsert: async ({ transaction }) => {
      // todo

      const { modified: newTodo } = transaction.mutations[0];

      await createTodo({ data: { title: newTodo.title as string } });
    },
  })
);
