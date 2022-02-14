import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { Card } from 'react-bootstrap'

const ProductCarousel = ({ product }) => {
  return (
    <Carousel pause='hover' className='bg-dark'>
      {product.map((products) => (
        <Carousel.Item key={products._id}>
          <Link to={`/product/${products._id}`}>
            <Image src={products.image} alt={products.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (£{products.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
