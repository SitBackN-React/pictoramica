import React, { useState, useEffect } from 'react'
import CommentCreate from './CommentCreate'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const Comments = (props) => {
  const [allComments, setAllComments] = useState([])
  const [refresh, setRefresh] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setAllComments(res.data.comments)
      })
      .then(() => msgAlert({
        heading: 'Showing all comments',
        message: messages.showAllCommentsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setAllComments([])
        msgAlert({
          heading: 'Failed to show comments ' + error.message,
          message: messages.showAllCommentsFailure,
          variant: 'danger'
        })
      })
  }, [refresh])

  const commentsJsx = allComments.map(comment => (
    <li className="comment-list" key={comment._id}>
      <p>Posted On: {comment.createdAt}</p>
      <p>{comment.remark}</p>
    </li>
  ))
  return (
    <div>
      <div>
        <p>Comments</p>
        {commentsJsx}
      </div>
      <div>
        <CommentCreate
          {...props}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  )
}

export default Comments
