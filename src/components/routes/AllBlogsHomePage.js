import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const AllBlogsHomePage = (props) => {
  const [setAllBlogs] = useState([])
  const [recentBlogs, setRecentBlogs] = useState([])

  // get msgAlerts from props
  const { msgAlert } = props

  // GET request to API for all of the blogs
  useEffect(() => {
    axios({
      url: `${apiUrl}/all-blogs`,
      method: 'GET'
    })
      .then(res => {
        // get only the first 4 recently made blogs
        if (res.data.blogs.length > 0) {
          const firstRecentBlog = res.data.blogs.shift()
          if (res.data.blogs.length > 0) {
            const secondRecentBlog = res.data.blogs.shift()
            if (res.data.blogs.length > 0) {
              const thirdRecentBlog = res.data.blogs.shift()
              if (res.data.blogs.length > 0) {
                const fourthRecentBlog = res.data.blogs.shift()
                setRecentBlogs([firstRecentBlog, secondRecentBlog, thirdRecentBlog, fourthRecentBlog])
              } else {
                setRecentBlogs([firstRecentBlog, secondRecentBlog, thirdRecentBlog])
              }
            } else {
              setRecentBlogs([firstRecentBlog, secondRecentBlog])
            }
          } else {
            setRecentBlogs([firstRecentBlog])
          }
        }
      })
      .then(() => msgAlert({
        heading: 'Showing all blogs',
        message: messages.showBlogsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setAllBlogs([])
        msgAlert({
          heading: 'Failed to show all blogs ' + error.message,
          message: messages.showBlogsFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }, [])

  const blogsJsx = recentBlogs.map(blog => (
    <div key={blog._id}>
      <Card
        bg={blog.borderColor}
        text={(blog.borderColor === 'light' || blog.borderColor === 'warning') ? 'dark' : 'white'}
        style={{ margin: '10px', borderWidth: '2px', width: '224px', height: '224px', borderRadius: '20px' }}>
        <Card.Body>
          <Card.Title className="title">
            {blog.title}
          </Card.Title>
          <Card.Text className="text">
            {blog.description}
          </Card.Text>
          <Link to={`/blogs/${blog._id}`}>
            <Button variant={(blog.borderColor === 'dark') ? 'outline-light' : 'outline-dark'}>Read more</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  ))

  return (
    <div>
      <h2>Recent Content</h2>
      <div style={{ margin: 'auto', width: '480px' }}>
        <CardDeck style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {blogsJsx}
        </CardDeck>
      </div>
    </div>
  )
}

export default AllBlogsHomePage
