import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

import ImageLike from './../shared/ImageLike'
import AddToCart from './AddToCart'

const Image = (props) => {
  // single image starts with a state of null, to be changed once setImage used
  const [image, setImage] = useState(null)
  // deleted starts with a state of false, to be changed once setDeleted used
  const [deleted, setDeleted] = useState(false)
  // for messages to show, need to set them to props
  const { msgAlert } = props
  // GET to show the image with the id that matches the params in url
  useEffect(() => {
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
    // updates the state with the data from image that was specified by id above
      .then(res => setImage(res.data.image))
      // .catch(console.error)
      // success message when a image is shown
      .then(() => msgAlert({
        heading: 'Showing selected image',
        message: messages.showImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setImage({
          tag: '',
          caption: '',
          imageUrl: '',
          like: 0,
          forSale: false })
        msgAlert({
          heading: 'Failed to show image ' + error.message,
          message: messages.showImageFailure,
          variant: 'danger'
        })
      })
  }, [])
  // delete action to delete the image that is specified by its id.
  const destroy = () => {
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Image Deleted',
        message: messages.deleteImageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setImage({
          tag: '',
          caption: '',
          imageUrl: '',
          like: 0,
          forSale: false
        })
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteImageFailure,
          variant: 'danger'
        })
      })
  }

  // if there's no image to show where user clicked, show "loading..."
  if (!image) {
    return <p>Loading...</p>
  }

  // if a image is deleted, Redirect user back to the list of all images
  if (deleted) {
    return (
      <Redirect to={'/my-images'} />
    )
  }

  const tagArray = (imageTag) => {
    const tags = imageTag.split(' ').map(tag =>
      <p key={tag}>
        <Link to={{
          pathname: '/all-images/tag',
          aboutProps: {
            tag: { tag }
          }
        }}
        style={{ color: 'white', margin: '7px' }}>
          #{tag}
        </Link>
      </p>
    )
    return tags
  }

  // Checks to see if the user has a imageLike or not in the image
  const checkUserLike = image => {
    if (image.imageLikes.length === 0) {
      return false
    } else {
      const findImageLike = image.imageLikes.filter(imageLike => props.user._id === imageLike.owner)
      if (findImageLike) {
        if (findImageLike.length === 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }

  // Looks for the imageLike id in the image
  // if there is one that the user created, return that 'id'
  // if not, return '0'
  const imageLikedId = image => {
    if (image.imageLikes.length === 0) {
      return '0'
    } else {
      const findImageLike = image.imageLikes.filter(imageLike => imageLike.owner === props.user._id)
      if (findImageLike.length === 0) {
        return '0'
      } else if (findImageLike) {
        const imageLikeId = findImageLike[0]._id
        return imageLikeId
      } else {
        return '0'
      }
    }
  }

  // Determines how many imageLikes there are in total for each image
  const imageLikedCount = image => {
    return image.imageLikes.length
  }

  const forSale = image => (
    <div>
      <p style={{ margin: '10px' }}><strong>${image.price}</strong></p>
      <AddToCart
        selectedItem={image}
        {...props}
        price={image.price}
      />
    </div>
  )

  return (
    // shows the specified fields(all details of the image) when a image is clicked
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 10px 0px' }}>
        <div style={{ width: '40%', marginRight: '20px' }}>
          <img style={{ width: '100%', height: 'auto', border: '2px solid #000000', overflow: 'none', borderRadius: '20px' }} src={image.imageUrl} />
        </div>
        <div style={{ paddingLeft: '10px' }}>
          <h1>{image.caption}</h1>
          <div style={{ fontSize: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {tagArray(image.tag)}
          </div>
          <ImageLike
            image={image}
            userLiked={checkUserLike(image)}
            imageLikedId={imageLikedId(image)}
            imageLikedCount={imageLikedCount(image)}
            {...props}
            user={props.user}
          />

          {image.forSale === true ? forSale(image) : <div style={{ display: 'none' }}></div>}

          <div style={{ marginTop: '30px' }}>
            {/*  button to click to delete a image */}
            {props.user._id === image.owner ? (
              <button className="btn btn-danger" onClick={destroy}>Delete Image</button>
            ) : (
              <button style={{ display: 'none' }}></button>
            )}
            {/*  // Link to take user to the edit page once the Edit Image button is clicked - TODO for V2 */}
            {/* }{props.user._id === image.owner ? (
              <Link to={`/images/${props.match.params.imageId}/edit-image`}>
                <button className="button btn btn-warning">Edit Image</button>
              </Link>
            ) : (
              <button style={{ display: 'none' }}></button>
            )} */}
            <div>
              {/* Link to take user back to all images list */}
              <Link to='/my-images' style={{ color: 'white' }}>Go to my images</Link>
            </div>
            <div>
              <Link to='/all-images' style={{ color: 'white' }}>Go to all images</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Image
