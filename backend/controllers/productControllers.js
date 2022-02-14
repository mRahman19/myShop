import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

export { getTopProducts }
