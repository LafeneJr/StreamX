import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import dotenv from "dotenv"

dotenv.config()

// console.log(`'password': ${process.env.DB_PASSWORD}`)
// console.log(process.env.DB_HOST)

const pool = new Pool({ 
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


export const db = drizzle(pool)

pool
.connect()
.then((client) => {
    console.log("Database connected successfully")    
    client.release()
})
.catch((err) => {
    console.error("Database connection error", err)
})

