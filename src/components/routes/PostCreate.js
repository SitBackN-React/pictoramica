import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './../shared/PostForm'
import messages from './../AutoDismissAlert/messages'

const PostCreate = props => {
  const [post, setPost] = useState({
    tite: '',
    content: ''
  })
  const [createdPostId, setCreatedPostId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedPost = Object.assign({}, post, updatedField)
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props

    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { post }
    })

      .then(res => {
        const newPostId = res.data.blog.posts[res.data.blog.posts.length - 1]._id
        return newPostId
      })
      .then(newPostId => setCreatedPostId(newPostId))
      .then(() => msgAlert({
        heading: 'Created post successfully',
        message: messages.createPostSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setPost({ tite: '', content: '', like: 0 })
        msgAlert({
          heading: 'Create post failed: ' + error.message,
          message: messages.createPostFailure,
          variant: 'danger'
        })
      })
  }
  if (createdPostId) {
    return <Redirect to={`/blogs/${props.match.params.blogId}`} />
  }

  return (
    <div>
      <PostForm
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/blogs/${props.match.params.blogId}`}
      />
    </div>
  )
}

export default PostCreate
