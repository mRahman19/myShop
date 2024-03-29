import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
} from '../controllers/orderControllers.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)

export default router
