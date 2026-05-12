import { Router } from "express"
import { loginUser, registerUser } from "./auth.controller.js"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { authorize } from "../../middlewares/role.middleware.js"
// import passport from "../../config/passport.js"
// import jwt from "jsonwebtoken"

const router = Router()

router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You accessed protected route",
  })
})

router.get("/admin/dashboard", authenticate, authorize("admin"),
(req, res) => {
    res.json({
        message: "Welcome Admin",
    })
})

router.get("/user/profile", authenticate, authorize("user"),
(req, res) => {
    res.json({
        message: "Welcome User"
    })
})

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// )

// router.get(
//   "/google/callback",

//   passport.authenticate("google", { session: false }),

//   (req: any, res) => {

//     const token = jwt.sign(
//       {
//         id: req.user.id,
//         email: req.user.email,
//         role: req.user.role
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "7d" }
//     )

//     res.json({
//       success: true,
//       token
//     })

//   }
// )

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router;