import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import PostLike from './PostLike'
import Comments from './Comments'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'
import Jumbotron from 'react-bootstrap/Jumbotron'
const Post = props => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)

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
      .then(() => msgAlert({
        heading: 'Showing selected post',
        message: messages.showPostSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setPost({ title: '', content: '', like: 0 })
        msgAlert({
          heading: 'Failed to show post' + error.message,
          message: messages.showPostFailure,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Post Deleted',
        message: messages.deletePostSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setPost({ title: '', content: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deletePostFailure,
          variant: 'danger'
        })
      })
  }

  if (!post) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={`/blogs/${props.match.params.blogId}`} />
    )
  }
  // const commentsJsx = post.comments.map(comment => (
  //   <li className="comment-list" key={comment._id}>
  //     <p>Posted By: {comment.commenter}</p>
  //     <p>{comment.remark}</p>
  //   </li>
  // ))
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

  return (
    <div>
      <Jumbotron fluid>
        <div className="blabla">
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
        </div>
      </Jumbotron>
      <div>
        <Comments
          {...props}
          post={post}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
        <button className="btn btn-danger" onClick={destroy} style={{ margin: '7px' }}>Delete Post</button>
        <Link to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/edit-post`}>
          <button className="button btn btn-warning" style={{ margin: '7px' }}>Edit Post</button>
        </Link>
        <Link to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comment-delete`}>
          <button className="btn btn-danger" style={{ margin: '7px' }}>Delete Comment</button>
        </Link>
        <Link to={`/blogs/${props.match.params.blogId}`}>
          <button className="btn btn-primary" style={{ margin: '7px' }}>Back to posts</button>
        </Link>
      </div>
    </div>
  )
}

export default Post
