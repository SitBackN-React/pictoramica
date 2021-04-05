import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

import MyBlogsPagination from './../shared/MyBlogsPagination'
import BlogsPaginate from './../shared/BlogsPaginate'

const MyBlogs = (props) => {
  const [myBlogs, setMyBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(10)

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/my-blogs`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setMyBlogs(res.data.blogs)
        setLoading(false)
      })
      .then(() => msgAlert({
        heading: 'Showing all of your blogs',
        message: messages.showMyBlogsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setMyBlogs({ title: '' })
        msgAlert({
          heading: 'Failed to show your blogs ' + error.message,
          message: messages.showMyBlogsFailure,
          variant: 'danger'
        })
      })
  }, [])

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = myBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5" style={{ textAlign: 'center' }}>
      <h1>My Blogs</h1>
      <BlogsPaginate
        blogs={currentBlogs}
        loading={loading}
      />
      <MyBlogsPagination
        blogsPerPage={blogsPerPage} totalBlogs={myBlogs.length}
        paginate={paginate}
      />
      <Link to={'/create-blog'}>
        <button className="button btn btn-dark btn-lg">Create New Blog</button>
      </Link>
    </div>
  )
}

export default MyBlogs
