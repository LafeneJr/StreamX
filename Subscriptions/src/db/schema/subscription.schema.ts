import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { plans } from "./plan.schema";
import { users } from "./users";

export const subscriptions = pgTable("subscriptions", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

    planId: uuid("plan_id")
    .references(() => plans.id)
    .notNull(),

    status: varchar("status", { length: 50 }).default("active"),

    startDate: timestamp("start_date").defaultNow(),

    endDate: timestamp("end_date")
})