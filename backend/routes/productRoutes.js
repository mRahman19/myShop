import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'
import { getTopProducts } from '../controllers/productControllers.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

//router.get('/top', getTopProducts)

router.get(
  '/top',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

export default router
