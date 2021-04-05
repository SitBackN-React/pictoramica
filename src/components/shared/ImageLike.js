import React, { useState } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const ImageLike = props => {
  // Initial logic of determining if the user has liked the image is being brought in through props
  const { image, userLiked, imageLikedId, imageLikedCount, user, msgAlert } = props

  // Keeps track of whether or not a user has liked the image
  const [userLike, setUserLike] = useState({
    liked: userLiked
  })

  // Keeps track of the imageLike id if there is one
  // If no imageLike id, then it will default to '0'
  const [likeId, setLikeId] = useState({
    imageLikedId: imageLikedId
  })

  // Keeps track of the total imageLike count for the image
  const [imageLikeCount, setImageLikeCount] = useState({
    imageLikedCount: imageLikedCount
  })

  const handleLike = () => {
    // If user did not like image yet, go to createLike to create imageLike and set userLike.liked to true
    // Otherwise, go to deleteLike to delete imageLike and set userLike.liked false
    userLike.liked ? deleteLike(image) : createLike(image)
  }

  const createLike = image => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { imageLike: {
        liked: true
      } }
    })
      .then(res => {
        // find the newest imageLike value created and gets its id
        const imageLikesArr = res.data.image.imageLikes
        const createdLike = imageLikesArr[imageLikesArr.length - 1]
        const createdLikeId = createdLike._id
        // updates likeId with the newly created imageLike id
        setLikeId({
          imageLikedId: createdLikeId
        })
      })
      // updates userLike to true
      .then((e) => setUserLike({
        liked: !userLike.liked
      }))
      // increases the total imageLike count by 1
      .then((e) => setImageLikeCount({
        imageLikedCount: imageLikeCount.imageLikedCount + 1
      }))
      .then(() => msgAlert({
        heading: 'Image Liked',
        message: messages.likeImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.likeImageFailure,
          variant: 'danger'
        })
      })
  }

  const deleteLike = image => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes/${likeId.imageLikedId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      // sets the userLike to false
      .then((e) => setUserLike({
        liked: !userLike.liked
      }))
      // resets the imageLike id current state to '0'
      .then((e) => setLikeId({
        imageLikedId: '0'
      }))
      // decreases the total imageLike count by 1
      .then((e) => setImageLikeCount({
        imageLikedCount: imageLikeCount.imageLikedCount - 1
      }))
      .then(() => msgAlert({
        heading: 'Message Unliked',
        message: messages.unlikeImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.unlikeImageFailure,
          variant: 'danger'
        })
      })
  }

  const likeIcon = userLike.liked ? 'https://user-images.githubusercontent.com/53062479/113616652-635d1b00-9623-11eb-9a1c-e62d2101bbc8.png' : 'https://user-images.githubusercontent.com/53062479/113616738-7cfe6280-9623-11eb-8a8b-9dd24a1cf513.png'
  const likeCount = imageLikeCount.imageLikedCount
  return (
    <div className="like-button">
      <img
        key={image._id}
        className='like-icon'
        src={likeIcon}
        style={{ cursor: 'pointer' }}
        onClick={handleLike}
      />
      <p className="like-count">{likeCount}</p>
    </div>
  )
}

export default ImageLike
