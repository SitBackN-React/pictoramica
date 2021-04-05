import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
// import './../../checkout.scss'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889')

const ProductDisplay = ({ handleClick, totalAmount }) => (
  // Creates order preview page
  <section>
    <div className="product">
      <div className="description">
        <h3>Total</h3>
        <h5>${totalAmount}</h5>
      </div>
    </div>
    <button type="button" id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
    <p>Note: Checkout page coming soon!</p>
  </section>
)
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function Checkout ({ user, totalAmount }) {
  const [message, setMessage] = useState('')
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }
    if (query.get('canceled')) {
      setMessage(
        'Order canceled -- continue to shop around and checkout when you\'re ready.'
      )
    }
  }, [])

  const handleClick = async (event) => {
    const stripe = await stripePromise

    const response = await fetch('/create-checkout-session', {
      method: 'POST'
    })

    const session = await response.json()

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} totalAmount={totalAmount}/>
  )
}
