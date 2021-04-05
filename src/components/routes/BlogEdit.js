import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

import BlogEditForm from '../shared/BlogEditForm'

const BlogEdit = props => {
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    borderColor: ''
  })

  const [updated, setUpdated] = useState(false)

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setBlog(res.data.blog))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setBlog(prevBlog => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedBlog = Object.assign({}, prevBlog, updatedField)
      return editedBlog
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { blog }
    })
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Edited Blog Successfully',
        message: messages.editBlogSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setUpdated({ title: '',
          description: '',
          borderColor: '' })
        msgAlert({
          heading: 'Failed to update blog ' + error.message,
          message: messages.editBlogFailure,
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return <Redirect to={`/blogs/${props.match.params.blogId}`} />
  }

  return (
    <div>
      <BlogEditForm
        blog={blog}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/blogs/${props.match.params.blogId}`}
      />
    </div>
  )
}

export default BlogEdit
