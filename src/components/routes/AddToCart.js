import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'

const AddToCart = (props) => {
  const { selectedItem, price, msgAlert, user } = props

  const [item, setItem] = useState({
    item: selectedItem,
    price: price
  })
  const [addItem, setAddItem] = useState(false)
  const [itemAdded, setItemAdded] = useState([])

  const handleAdd = () => {
    (addItem === false) ? addToCart(item) : alreadyAdded(item)
  }

  const addToCart = item => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/cartItems`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { cartItem: {
        item: item.item,
        price: item.price
      } }
    })
      .then(res => setItemAdded(res.data.cartItem))
      .then(setAddItem(true))
      .then(() => msgAlert({
        heading: 'Added to Cart ' + itemAdded,
        variant: 'success'
      }))
      .catch(error => {
        setItem({
          item: [],
          price: 0
        })
        msgAlert({
          heading: 'Failed to add to cart ' + error.message,
          variant: 'danger'
        })
      })
  }

  const alreadyAdded = item => {
    msgAlert({
      heading: 'Already Added to Cart',
      variant: 'danger'
    })
  }

  return (
    <div>
      <button
        onClick={handleAdd}
        style={{ borderRadius: '0.25rem' }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default AddToCart
