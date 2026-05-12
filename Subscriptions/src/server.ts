import "dotenv/config";
import app from "./app.js";
import "./db/index.js"
import "./jobs/subscriptionReminder.job.js"

const PORT = process.env.PORT!;

app.listen(PORT, () => {
  console.log(`Server successfully running on port ${PORT}`);
});