import { pgTable, timestamp, text, boolean } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
	id: text("id").primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	title: text("title").notNull(),
	completed: boolean("completed").notNull().default(false),
});
