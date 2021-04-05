import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PostEditForm from '../shared/PostEditForm'
import messages from './../AutoDismissAlert/messages'

const PostEdit = props => {
  const [post, setPost] = useState({
    title: '',
    content: ''
  })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setPost(res.data.post))
      .catch(console.error)
  }, [])
  const handleChange = event => {
    event.persist()
    setPost(prevPost => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevPost, updatedField)
      return editedPost
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { post }
    })
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Edited Post Successfully',
        message: messages.editPostSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setUpdated({ title: '', content: '' })
        msgAlert({
          heading: 'Failed to update blog ' + error.message,
          message: messages.editPostFailure,
          variant: 'danger'
        })
      })
  }
  if (updated) {
    return <Redirect to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`} />
  }
  return (
    <div>
      <PostEditForm
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/${props.match.params.blogId}/posts/${props.match.params.postId}`}
      />
    </div>
  )
}

export default PostEdit
