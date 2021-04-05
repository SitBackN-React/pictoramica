import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

import MyImagesPagination from './../shared/MyImagesPagination'
import ImagesPaginate from './../shared/ImagesPaginate'

const MyImages = (props) => {
  const [myImages, setMyImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage] = useState(10)

  const { msgAlert } = props
  // GET request to get all of the images user has created
  useEffect(() => {
    axios({
      url: `${apiUrl}/my-images`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      // sets the response
      .then(res => {
        setMyImages(res.data.images)
        setLoading(false)
      })
      // success message if user is viewing all lists
      .then(() => msgAlert({
        heading: 'Showing all of your images',
        message: messages.showImagesSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setMyImages({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
        msgAlert({
          heading: 'Failed to show your images ' + error.message,
          message: messages.showImagesFailure,
          variant: 'danger'
        })
      })
  }, [])

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = myImages.slice(indexOfFirstImage, indexOfLastImage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5" style={{ textAlign: 'center' }}>
      <h1>My Images</h1>
      <ImagesPaginate
        images={currentImages}
        loading={loading}
        {...props}
      />
      <MyImagesPagination
        imagesPerPage={imagesPerPage}
        totalImages={myImages.length}
        paginate={paginate}
        style={{ margin: '20px' }}
      />
      <Link to={'/post-image'}>
        <button className="button btn btn-dark btn-lg">Add New Image</button>
      </Link>
    </div>
  )
}

export default MyImages
