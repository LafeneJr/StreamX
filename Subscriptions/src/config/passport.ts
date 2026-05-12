// import passport from "passport"
// import { Strategy as GoogleStrategy } from "passport-google-oauth20"

// import { db } from "../db"
// import { users } from "../db/schema/users"
// import { eq } from "drizzle-orm"

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: "/api/auth/google/callback",
//     },

//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value

//         // Ensure email exists
//         if (!email) {
//           return done(new Error("No email found from Google"), undefined)
//         }

//         const existingUser = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, email))

//         if (!existingUser.length) {
//           const newUser = await db
//             .insert(users)
//             .values({
//             name: profile.displayName || "No Name",
//             email: email,
//             password: "GOOGLE_AUTH",
//             provider: "google",
//             googleId: profile.id,
//             })
//             .returning()

//           return done(null, newUser[0])
//         }

//         return done(null, existingUser[0])
//       } catch (error) {
//         return done(error as Error, undefined)
//       }
//     }
//   )
// )

// export default passport