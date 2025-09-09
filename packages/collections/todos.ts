import { createTodo, getTodos } from "@repo/functions/todos";
import { QueryClient } from "@tanstack/query-core";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";

const queryClient = new QueryClient();

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
	}),
);
