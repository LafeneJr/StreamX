import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { loginSchema, registerSchema } from "./auth.schema.js"
import { db } from "../../db/index.js"
import { users } from "../../db/schema/users.js"
import { eq } from "drizzle-orm"
import { generateToken } from "../../utils/jwt.js";
import { sendEmail } from "../../services/email.service.js"


export const registerUser = async (req: Request, res: Response) => {
    try {
        //Validate input
        const validatedData = registerSchema.parse(req.body)

        const { name, email, password } = validatedData

        //Check if user already exists
        const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "Email already registered"})
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Insert user
        await db.insert(users).values({            
            name,
            email,
            password: hashedPassword,
            role: "user", // default role
        })

        await sendEmail(
            email,
            "Welcome to Streaming Platform",
            `
            <h2>Welcome!</h2>
            <p>Your account has been created successfully.</p>
            <p>You can now subscribe and start watching.</p>
            `
        )
        return res.status(201).json({ success: true, message: "User registered successfully"})

    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message || "Registration failed",})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        //Validate input
        const validatedData = loginSchema.parse(req.body)
        const { email, password } = validatedData

        // Find User
        const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

        if (existingUser.length === 0) {
            return res.status(400).json({success: false, message: "Invalid email or password",})
        }

        const user = existingUser[0]

        // Compare Password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password",})
        }
        
        //Generate JWT
        const token = generateToken(
            {
                id: user.id,
                email: user.email,
                role: user.role,        
            },            
        );
        return res.status(200).json({ success: true, message: "Login successful", token,})

    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message || "Login failed",})
    }
}