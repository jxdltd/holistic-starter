import { EventSchemas, Inngest } from "inngest";

type TodoCreatedEvent = {
	data: {
		todo: {
			id: string;
		};
	};
};

type Events = {
	"todo/created": TodoCreatedEvent;
};

export const inngest = new Inngest({
	id: "app",
	isDev: process.env.NODE_ENV !== "production",
	schemas: new EventSchemas().fromRecord<Events>(),
});
