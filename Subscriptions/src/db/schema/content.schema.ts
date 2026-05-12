import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { plans } from "./plan.schema";

export const contents = pgTable("contents", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    mediaUrl: text("media_url"), // video link, pdf link etc
    planId: uuid("plan_id")
    .references(() => plans.id)
    .notNull(),

    createdAt: timestamp("created_at").defaultNow(),
}) 