import React, { useState } from 'react'

import axios from 'axios'
import apiUrl from './../../apiConfig'

const ForSale = (props) => {
  const [isForSale, setForSale] = useState({
    imageUrl: props.image.imageUrl,
    forSale: props.image.forSale
  })

  const handleChange = (event) => setForSale(() => {
    return {
      imageUrl: props.image.imageUrl,
      forSale: !isForSale.forSale
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/images/${props.image._id}/for-sale`,
      method: 'PATCH',
      data: { image: {
        imageUrl: props.image.imageUrl,
        forSale: !isForSale.forSale
      } }
    })
      .catch(console.error)
  }

  const likeIcon = (isForSale.forSale) ? '✔' : ''

  return (
    <React.Fragment>
      <input
        key={props.image._id}
        type="button"
        className='for-sale-icon'
        value={likeIcon}
        style={{ cursor: 'pointer' }}
        onClick={(event) => {
          handleChange(event)
          handleSubmit(event)
        }}
      />
    </React.Fragment>
  )
}

export default ForSale
