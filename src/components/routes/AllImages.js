import React, { useState, useEffect } from 'react'

import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

import AllImagesPagination from './../shared/AllImagesPagination'
import ImagesPaginate from './../shared/ImagesPaginate'

const AllImages = (props) => {
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage] = useState(10)

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/all-images`,
      method: 'GET'
    })
      .then(res => {
        setAllImages(res.data.images)
        setLoading(false)
      })
      .then(() => msgAlert({
        heading: 'Showing all images',
        message: messages.showAllImagesSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setAllImages([])
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.showAllImagesFailure,
          variant: 'danger'
        })
      })
  }, [])

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5" style={{ textAlign: 'center' }}>
      <h1>All Images</h1>
      <ImagesPaginate
        images={currentImages}
        loading={loading}
        {...props}
      />
      <AllImagesPagination
        imagesPerPage={imagesPerPage}
        totalImages={allImages.length}
        paginate={paginate}
        style={{ margin: '20px' }}
      />
    </div>
  )
}

export default AllImages
