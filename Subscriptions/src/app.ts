import express from "express"
import cors from "cors"
import helmet from "helmet"

import authRoutes from "./modules/auth/auth.route.js"
import userRoutes from "./routes/user.routes.js"
import planRoutes from "./routes/plan.routes.js"
import contentRoutes from "./routes/content.routes.js"
import subRoutes from "./routes/subscription.routes.js"
import deviceRouter from "./routes/device.routes.js"
import historyRoutes from "./routes/history.routes.js"

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/plans", planRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/subscriptions", subRoutes)
app.use("/api/devices", deviceRouter)
app.use("/api/history", historyRoutes)
app.use("/api", contentRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})


export default app