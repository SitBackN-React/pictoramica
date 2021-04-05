import React from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

const CartItemDelete = (props) => {
  const { cartItemId, user, msgAlert } = props

  const destroy = () => {
    axios({
      url: `${apiUrl}/cartItems/${cartItemId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => {
        msgAlert({
          heading: 'Item Removed',
          variant: 'success'
        })
        props.setRefresh(!props.refresh)
      })
      .catch(error => {
        msgAlert({
          heading: 'Failed to Remove Item' + error.message,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      <p className="delete-item-button" onClick={destroy} style={{ color: 'black', cursor: 'pointer' }}>
        delete
      </p>
    </div>
  )
}

export default CartItemDelete
