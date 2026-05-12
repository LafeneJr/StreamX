import { boolean, integer, pgTable, text, timestamp, uuid, varchar,} from "drizzle-orm/pg-core"

export const plans = pgTable("plans", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    description: text("description"),

    price: integer("price").notNull(), // store in cents

    duration: integer("duration").notNull(), // duration in days

    isActive: boolean("is_active").default(true),

    maxDevices: integer("max_devices").notNull().default(1),

    createdAt: timestamp("created_at").defaultNow(),
})