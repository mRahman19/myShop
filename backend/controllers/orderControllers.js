import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxprice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxprice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  private

const getOrderById = asyncHandler(async (req, res) => {
  //get order details by id and add user name and email
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  //use find as looking more than 1 item and pass user object
  //as get value only for logged in user
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export { addOrderItems, getOrderById, getMyOrders }
