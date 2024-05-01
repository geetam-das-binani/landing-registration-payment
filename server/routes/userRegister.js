import express from 'express'
import { registerHandler ,verifyOtpHandler} from '../controllers/registerController.js'

const router = express.Router()

router.post("/register",registerHandler)
router.post("/verify-otp",verifyOtpHandler)

export default router