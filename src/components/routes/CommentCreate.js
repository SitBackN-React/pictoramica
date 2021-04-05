import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CommentForm from './../shared/CommentForm'
import messages from './../AutoDismissAlert/messages'

const CommentCreate = props => {
  const [comment, setComment] = useState({
    remark: ''
  })
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedComment = Object.assign({}, comment, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props

    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { comment }
    })
      .then(() => {
        msgAlert({
          heading: 'Created comment successfully',
          variant: 'success'
        })
      })
      .then(() => {
        props.setRefresh(!props.refresh)
      })
      .then(setComment({ remark: '' }))
      .catch(error => {
        setComment({ remark: '' })
        msgAlert({
          heading: 'Create comment failed: ' + error.message,
          message: messages.createCommentFailure,
          variant: 'danger'
        })
      })
  }

  // if (createdComment) {
  //   return <Redirect to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/post-public`} />
  // }
  return (
    <div>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/post-public`}
      />
    </div>
  )
}

export default CommentCreate
