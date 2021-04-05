import React, { useState } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const PostLike = props => {
  // Initial logic of determining if the user has liked the post is being brought in through props
  const { post, userLiked, postLikedId, postLikedCount, user, msgAlert } = props

  // Keeps track of whether or not a user has liked the post
  const [userLike, setUserLike] = useState({
    liked: userLiked
  })

  // Keeps track of the postLike id if there is one
  // If no postLike id, then it will default to '0'
  const [likeId, setLikeId] = useState({
    postLikedId: postLikedId
  })

  // Keeps track of the total postLike count for the post
  const [postLikeCount, setPostLikeCount] = useState({
    postLikedCount: postLikedCount
  })

  const handleLike = () => {
    // If user did not like post yet, go to createLike to create postLike and set userLike.liked to true
    // Otherwise, go to deleteLike to delete postLike and set userLike.liked false
    userLike.liked ? deleteLike(post) : createLike(post)
  }

  const createLike = post => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${post._id}/postLikes`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { postLike: {
        liked: true
      } }
    })

      .then(res => {
        // find the newest postLike's id from the respons
        const updatedpost = res.data.blog.posts.find(updatedpost => updatedpost._id === post._id)
        const postLikesArray = updatedpost.postLikes
        const createdLike = postLikesArray[postLikesArray.length - 1]
        const createdLikeId = createdLike._id
        // updates likeId with the newly created postLike id
        setLikeId({
          postLikedId: createdLikeId
        })
      })
      // updates userLike to true
      .then((e) => setUserLike({
        liked: true
      }))
      // increases the total postLike count by 1
      .then((e) => setPostLikeCount({
        postLikedCount: postLikeCount.postLikedCount + 1
      }))
      .then(() => msgAlert({
        heading: 'Post Liked',
        message: messages.likePostSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        // message if posts failed to show
        msgAlert({
          heading: 'Failed to Like post' + error.message,
          message: messages.likePostFailure,
          variant: 'danger'
        })
      })
  }

  const deleteLike = post => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${post._id}/postLikes/${likeId.postLikedId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      // sets the userLike to false
      .then((e) => setUserLike({
        liked: false
      }))
      // resets the postLike id current state to '0'
      .then((e) => setLikeId({
        postLikedId: '0'
      }))
      // decreases the total postLike count by 1
      .then((e) => setPostLikeCount({
        postLikedCount: postLikeCount.postLikedCount - 1
      }))
      .then(() => msgAlert({
        heading: 'post Unliked',
        message: messages.unlikePostSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        // message if posts failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.unlikePostFailure,
          variant: 'danger'
        })
      })
  }

  const likeIcon = userLike.liked ? 'https://user-images.githubusercontent.com/53062479/113616652-635d1b00-9623-11eb-9a1c-e62d2101bbc8.png' : 'https://user-images.githubusercontent.com/53062479/113616738-7cfe6280-9623-11eb-8a8b-9dd24a1cf513.png'
  const likeCount = postLikeCount.postLikedCount
  return (
    <div className="like-button">
      <img
        key={post._id}
        className='like-icon-post'
        src={likeIcon}
        style={{ cursor: 'pointer' }}
        onClick={handleLike}
      />
      <p style={{ color: 'black' }}>{likeCount}</p>
    </div>
  )
}

export default PostLike
