import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './../../apiConfig'

import Checkout from './Checkout'
import CartItemDelete from './CartItemDelete'

const Cart = (props) => {
  const [cart, setCart] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/cartItems`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setCart(res.data.cartItems)
        setIsLoading(false)
      })
      .then(() => msgAlert({
        heading: 'Showing all of the items in your cart',
        variant: 'primary'
      }))
      .catch(error => {
        setCart([])
        msgAlert({
          heading: 'Failed to show the items in your cart ' + error.message,
          variant: 'danger'
        })
      })
  }, [refresh])

  const cartJsx = cart.map(cartItem => (
    <div key={cartItem._id} style={{ backgroundColor: 'white', margin: '10px', borderRadius: '20px', width: '500px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px', color: 'black', justifyContent: 'space-between' }} >
        <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
          <Link to={`/images/${cartItem.item[0]._id}`} style={{ marginRight: '10px' }}>
            <img src={cartItem.item[0].imageUrl} style={{ width: '150px', height: '150px', border: '2px solid black', borderRadius: '20px' }} />
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'black' }}>
            <Link to={`/images/${cartItem.item[0]._id}`} style={{ color: 'black' }}>
              <h4>{cartItem.item[0].caption}</h4>
            </Link>
            <CartItemDelete
              cartItem={cartItem}
              cartItemId={cartItem._id}
              {...props}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        </div>
        <div style={{ margin: '10px' }}>
          <h4>${cartItem.price}</h4>
        </div>
      </div>
    </div>
  ))

  const itemPrice = cart.map(cartItem => cartItem.price)
  let totalAmount = 0
  for (let i = 0; i < itemPrice.length; i++) {
    totalAmount = totalAmount + itemPrice[i]
  }

  const cartDisplay = (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
        {(cart.length > 0) ? cartJsx : <div>No items in your cart</div>}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      {isLoading ? <div>Loading Cart</div> : cartDisplay}
      <div>
        <Checkout
          {...props}
          user={props.user}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  )
}

export default Cart
