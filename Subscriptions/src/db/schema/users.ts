import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 150 }).notNull().unique(),
    password: text("password").notNull(),
    role: varchar("role", { length: 20 }).notNull().default("users"), // users or admin
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
})