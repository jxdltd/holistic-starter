import { createCollection, eq, useLiveQuery } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createTodo, getTodos } from "../todos";
import { queryClient } from "../utils/query-client";

export const todoCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["todos"],
    queryFn: async () => {
      return getTodos();
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const { modified: newTodo } = transaction.mutations[0];

      await createTodo({ data: { title: newTodo.title } });
    },
  })
);
