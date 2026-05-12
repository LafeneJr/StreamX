import cron from "node-cron"
import { db } from "../db"
import { subscriptions } from "../db/schema/subscription.schema"
import { users } from "../db/schema/users"
import { sendEmail } from "../services/email.service"

cron.schedule("0 9 * * *", async () => {

    const subs = await db.select().from(subscriptions)

    for (const sub of subs) {

        const daysLeft =
        new Date(sub.endDate!).getTime() - Date.now()

        const days = Math.floor(daysLeft / (1000 * 60 * 60 * 24))

        if (days === 3) {

            const user = await db
            .select()
            .from(users)

            await sendEmail(
                user[0].email,
                "Subscription Expiring Soon",
                `
                <h2>Your subscription expires in 3 days</h2>\
                <p>Please renew to continue watching.</p>
                `
            )
        }
    }
})