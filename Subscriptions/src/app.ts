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

app.use(helmet())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is running"})
})


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/plans", planRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/subscriptions", subRoutes)
app.use("/api/devices", deviceRouter)
app.use("/api/history", historyRoutes)
app.use("/api", contentRoutes)

export default app