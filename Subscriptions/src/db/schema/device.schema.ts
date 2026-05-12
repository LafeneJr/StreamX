import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const devices = pgTable ("devices", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

    devicesName: varchar("device_name", { length: 255 }),

    devicesToken: varchar("device_token", { length: 255 }),

    lastActive: timestamp("last_active").defaultNow()
})