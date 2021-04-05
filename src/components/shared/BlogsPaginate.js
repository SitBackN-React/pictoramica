import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

const AllBlogsPaginate = ({ blogs, loading }) => {
  if (loading) {
    return <h1>Loading</h1>
  }

  const blogsJsx = blogs.map(blog => (
    <li key={blog._id}>
      <Card
        border={blog.borderColor} style={{ margin: '7px', borderWidth: '8px', width: '200px', height: '200px', borderRadius: '20px' }}
      >
        <Card.Body>
          <Card.Title className="title">
            {blog.title}
          </Card.Title>
          <Card.Text className="textBlog">
            {blog.description}
          </Card.Text>
          <Link to={`/blogs/${blog._id}`}>
            <Button
              variant='outline-dark'
            >Read more</Button>
          </Link>
        </Card.Body>
      </Card>
    </li>
  ))

  return (
    <ul style={{ color: 'black' }}>
      <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {blogsJsx}
      </CardDeck>
    </ul>
  )
}

export default AllBlogsPaginate
