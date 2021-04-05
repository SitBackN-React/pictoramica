import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import CardDeck from 'react-bootstrap/CardDeck'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'
import PostLike from './PostLike'
import Jumbotron from 'react-bootstrap/Jumbotron'

const Blog = (props) => {
  const [blog, setBlog] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBlog(res.data.blog))
      .then(() => msgAlert({
        heading: 'Showing selected blog',
        message: messages.showBlogSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBlog({ title: '' })
        msgAlert({
          heading: 'Failed to show blog' + error.message,
          message: messages.showBlogFailure,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Blog Deleted',
        message: messages.deleteBlogSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setBlog({ title: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteBlogFailure,
          variant: 'danger'
        })
      })
  }

  if (!blog) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={'/my-blogs'} />
    )
  }
  // Checks to see if the user has a postLike or not in the post
  const checkUserLike = post => {
    if (post.postLikes.length === 0) {
      return false
    } else {
      const findPostLike = post.postLikes.filter(postLike => postLike.owner === props.user._id)
      if (findPostLike) {
        if (findPostLike.length === 0) {
          return false
        }
        return true
      } else {
        return false
      }
    }
  }

  // Looks for the postLike id in the post
  // if there is one that the user created, return that 'id'
  // if not, return '0'
  const postLikedId = post => {
    if (post.postLikes.length === 0) {
      return '0'
    } else {
      const findPostLike = post.postLikes.filter(postLike => postLike.owner === props.user._id)
      if (findPostLike.length === 0) {
        return '0'
      } else if (findPostLike) {
        const postLikeId = findPostLike[0]._id
        return postLikeId
      } else {
        return '0'
      }
    }
  }

  // Determines how many postLikes there are in total for each post
  const postLikedCount = post => {
    return post.postLikes.length
  }
  // if user owns the post

  const postsOwnerJsx = blog.posts.map(post => (
    <li style={{ width: '100%', listStyle: 'none' }} key={post._id}>
      <Jumbotron fluid>
        <div style={{ width: '100%', padding: 50 }}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          <Link to={`/blogs/${props.match.params.blogId}/posts/${post._id}`}>
            <Button variant="outline-secondary">Read more</Button>
          </Link>
          <div>
            <PostLike
              post={post}
              userLiked={checkUserLike(post)}
              postLikedId={postLikedId(post)}
              postLikedCount={postLikedCount(post)}
              {...props}
              user={props.user}
            />
          </div>
        </div>
      </Jumbotron>
    </li>
  ))

  // if user does not own the post
  const postsPublicJsx = blog.posts.map(post => (
    <li style={{ width: '100%' }} key={post._id}>
      <Jumbotron fluid>
        <div style={{ width: '100%', padding: 50 }}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div className="postlikeonpost">
            <PostLike
              post={post}
              userLiked={checkUserLike(post)}
              postLikedId={postLikedId(post)}
              postLikedCount={postLikedCount(post)}
              {...props}
              user={props.user}
            />
          </div>
          <Link to={`/blogs/${props.match.params.blogId}/posts/${post._id}/post-public`}>
            <Button variant="outline-secondary">Read more</Button>
          </Link>
        </div>
      </Jumbotron>
    </li>
  ))

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Blog Name: {blog.title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardDeck >
          {props.user._id === blog.owner ? (
            postsOwnerJsx
          ) : (
            postsPublicJsx
          )}
        </CardDeck>
      </div>
      <div>
        {props.user._id === blog.owner ? (
          <Link to={`/blogs/${props.match.params.blogId}/create-post`}>
            <button className="btn btn-primary" style={{ display: 'inline', margin: '7px' }}>Create New Post</button>
          </Link>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
        {props.user._id === blog.owner ? (
          <button className="btn btn-danger" onClick={destroy} style={{ display: 'inline', margin: '7px' }}>Delete Blog</button>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
        {props.user._id === blog.owner ? (
          <Link to={`/blogs/${props.match.params.blogId}/edit-blog`}>
            <button className="button btn btn-warning" style={{ display: 'inline', margin: '7px' }}>Edit Blog</button>
          </Link>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
      </div>
      <div>
        <button className="btn btn-success" type="button" style={{ margin: '7px' }} onClick={() => props.history.goBack()}>
      Go back
        </button>
      </div>
    </div>
  )
}

export default Blog
