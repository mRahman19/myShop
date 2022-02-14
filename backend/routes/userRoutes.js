import express from 'express'
import asyncHandler from 'express-async-handler'

const router = express.Router()
import User from '../models/userModel.js'
import { protect } from '../middleware/authMiddleware.js'
import {
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'

import jwt from 'jsonwebtoken'
// gererate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })
)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/').post(registerUser)

export default router
